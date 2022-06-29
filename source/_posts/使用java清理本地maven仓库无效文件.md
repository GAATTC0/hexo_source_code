---
title: 使用java清理本地maven仓库无效文件
categories:
  - 学习
  - java
tags:
  - java
abbrlink: 34e027a
date: 2022-06-29 18:41:45
img:
---

由于maven的jar包频繁更新，随着maven reimport次数的增加，本地仓库中的无效文件(包括jar包、pom文件、校验和文件和未下载成功文件)会占用大量磁盘空间，但是把本地仓库暴力地全部清理后还需要重新下依赖，且下了依赖后IDEA还要花较长时间重新建立索引，非常不方便。
所以，利用java的文件io写了一个工具类，用来根据匹配规则删除无效的文件。规则：

- 删除所有空文件夹

- 删除所有扩展名为`.lastUpdated`的文件

- 删除所有扩展名为`.sha1`的文件

- 删除自定义路径下所有不包含`SNAPSHOT`的jar文件

- 删除自定义路径下所有不包含`SNAPSHOT`的pom文件
  

另外:
集成了文件和目录的删除记录日志，记录删除的文件/目录绝对路径、删除结果、释放磁盘空间大小、删除总耗时。支持控制台日志和持久化日志，通过开关控制;
支持不同操作系统。

> 注意:
> 执行清理时建议关闭工程和代码工程，可避免因资源占用导致的部分文件删除失败；
> 虽然工程实际依赖的是最新的jar包但可能不是SNAPSHOT这份(尽管两者除文件名外是相同的)，所以需要在清理后刷新maven依赖来保证正确依赖。

下面是代码：

```java
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class MavenRepositoryCleaner {

    // 本地maven仓库路径
    private static final String MAVEN_REPOSITORY_ROOT = "F:\\mavenRepository";
    // 控制台日志开关
    private static final boolean TERMINAL_LOG = true;
    // 持久化日志开关(默认存放于maven仓库根目录下)
    private static final boolean FILE_LOG = true;
    private static final String SEPARATOR = File.pathSeparator;
    // 清理过期jar与pom的路径
    private static final String[] CUSTOM_CLEAN_PATHS = new String[]{
            SEPARATOR + "com" + SEPARATOR + "xxx",
            SEPARATOR + "org" + SEPARATOR + "xxx"
    };
    private static final String JAR_SUFFIX = ".jar";
    private static final String POM_SUFFIX = ".pom";
    private static final String SHA_SUFFIX = ".sha1";
    private static final String SNAPSHOT = "SNAPSHOT";
    private static final String INVALID_FILE_SUFFIX = ".lastUpdated";
    private static final List<OutputStreamWriter> LOGGERS = new ArrayList<>();
    private static long startTime;
    private static long totalSpace = 0L;
    private static int delFiles = 0;
    private static int delDirs = 0;
    private static int failed = 0;

    public static void main(String[] args) throws IOException {
        init();
        if (checkRootValid()) {
            traverseFolder(new File(MAVEN_REPOSITORY_ROOT), getInvalidFilePredicate());
            for (String cleanPath : CUSTOM_CLEAN_PATHS) {
                File dir = new File(MAVEN_REPOSITORY_ROOT + cleanPath);
                if (dir.exists() && dir.isDirectory()) {
                    traverseFolder(dir, getCustomInvalidFilePredicate());
                }
            }
        }
        close();
    }

    private static boolean checkRootValid() {
        boolean valid = true;
        File root = new File(MAVEN_REPOSITORY_ROOT);
        if (!root.exists() || !root.isDirectory()) {
            log("[ERROR] please check maven repository root exist: ", MAVEN_REPOSITORY_ROOT);
            valid = false;
        }
        return valid;
    }

    private static Predicate<File> getInvalidFilePredicate() {
        return f -> {
            String name = f.getName();
            return name.endsWith(INVALID_FILE_SUFFIX)
                    || name.endsWith(SHA_SUFFIX);
        };
    }

    private static Predicate<File> getCustomInvalidFilePredicate() {
        return f -> {
            String name = f.getName();
            return (name.endsWith(JAR_SUFFIX) && !name.contains(SNAPSHOT))
                    || (name.endsWith(POM_SUFFIX) && !name.contains(SNAPSHOT));
        };
    }

    private static void traverseFolder(File dir, Predicate<File> predicate) {
        File[] listFiles = dir.listFiles();
        if (listFiles != null) {
            if (0 == listFiles.length) {
                delete(dir);
                return;
            }
            List<File> subFiles = new ArrayList<>();
            for (File file : listFiles) {
                if (file.isDirectory()) {
                    traverseFolder(file, predicate);
                } else {
                    subFiles.add(file);
                }
            }
            if (!subFiles.isEmpty()) {
                doClean(subFiles, predicate);
            }
        }
    }

    private static void doClean(List<File> subFiles, Predicate<File> predicate) {
        subFiles.stream()
                .filter(predicate)
                .forEach(MavenRepositoryCleaner::delete);
    }

    @SuppressWarnings("unused")
    private static void delete(File file) {
        long length = file.length();
        boolean isDir = file.isDirectory();
        try {
            Files.delete(file.toPath());
            log("delete succeed:", file.getAbsolutePath(), "; release space: ", generateSpaceString(length));
            totalSpace += length;
            int i = isDir ? delDirs++ : delFiles++;
        } catch (IOException e) {
            log("delete failed: ", file.getAbsolutePath(), e.getMessage());
            failed++;
        }
    }

    private static String generateSpaceString(long space) {
        if (space > 1073741823L) {
            return space / 1073741824L + "GB," + generateSpaceString(space % 1073741824L);
        } else if (space > 1048575L) {
            return space / 1048576L + "MB," + generateSpaceString(space % 1048576L);
        } else if (space > 1023L) {
            return space / 1024L + "KB," + generateSpaceString(space % 1024L);
        } else {
            return space + "B";
        }
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    private static void init() throws IOException {
        startTime = System.currentTimeMillis();
        if (TERMINAL_LOG) {
            LOGGERS.add(new OutputStreamWriter(new BufferedOutputStream(System.out)));
        }
        if (FILE_LOG) {
            File logFile = new File(MAVEN_REPOSITORY_ROOT + SEPARATOR + "mavenRepositoryCleaner.log");
            if (!logFile.exists()) {
                logFile.createNewFile();
            }
            LOGGERS.add(new OutputStreamWriter(new BufferedOutputStream(new FileOutputStream(logFile, true))));
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        log("[", format.format(startTime), "] clean task started...");
    }

    private static void log(String... info) {
        try {
            for (String i : info) {
                for (OutputStreamWriter logger : LOGGERS) {
                    logger.write(i);
                }
            }
            for (OutputStreamWriter logger : LOGGERS) {
                logger.write(System.lineSeparator());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void close() throws IOException {
        log("clean finished, deleted files:", Integer.toString(delFiles),
                ", deleted dirs:", Integer.toString(delDirs),
                ", failed:", Integer.toString(failed));
        log("released disk space: ", generateSpaceString(totalSpace));
        log("cost time: ", Long.toString(System.currentTimeMillis() - startTime), "mills");
        for (OutputStreamWriter logger : LOGGERS) {
            logger.close();
        }
    }

}
```

