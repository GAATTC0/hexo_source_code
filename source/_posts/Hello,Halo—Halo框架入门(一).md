---
title: 'Hello,Halo—Halo框架入门(一)'
top: false
categories:
  - 学习
  - halo
tags:
  - halo
abbrlink: 4bcf9dad
date: 2022-09-20 20:48:00
img:
---

# Hello,Halo—Halo框架入门(一)

> [官方网站](https://halo.run/)    [官方文档](https://docs.halo.run/)

## 一、环境准备

## 1.JDK环境

从 `1.4.3 `起，版本要求为 11 以上的版本。`1.4.3 `以下需要 8 以上的版本。
本文以及本站使用`1.5.4~`版本，故使用jdk11。

## 2.MySQL环境

> **摘自帮助文档**：这并不是 Halo 必须依赖的，Halo 默认使用自带的 `H2 Database`，无需单独安装。如果 `H2 Database` 不能满足你的要求，您需要在系统内安装并运行好 MySQL。具体要求：
>
> 1. 版本：5.7 +
> 2. 字符集（Character Set）：`utf8mb4`
> 3. 排序规则（Collate）：`utf8mb4_bin`
> 4. 存储引擎：`InnoDB`

出于性能以及手动增删改查的便捷性考虑，使用mysql持久化。

## 二、源码

[仓库地址](https://github.com/halo-dev/halo)
此为halo项目地址，其中`release-1.4`为第一个稳定版本，`release-1.5`与`next`分别为下一个版本的开发分支，我们二次开发时可以选择较新的`master`分支或者`release-1.5`分支。另外，2.0版本将在2022.9.30发布，届时也可体验最新版本的halo。

我使用的是master分支，fork后clone之：

```bash
git clone git@github.com:GAATTC0/halo.git
```

## 三、运行

克隆项目后使用IDE打开项目，识别并解析gradle项目配置，并进行依赖资源的import。

准备工作完成后编译项目，并运行`run.halo.app.Application`主类。

## 四、踩坑记录

### 1.编译时依赖和语法报错问题

如下面这两段：

```java
return ignoredClasses.toArray(Class[]::new);
// ...
public static Pair<Ref, RevCommit> getLatestTag(final Git git)
        throws GitAPIException, IOException {
        final var tags = git.tagList().call();
        // ...
        try (final var revWalk = new RevWalk(git.getRepository())) {
            revWalk.reset();
            // ...
        }
    }
```

- 依赖问题：gradle需要设置auto import，或是手动import依赖即可
- 编译问题：项目中有很多java11的语法和api，需要检查`Project Structure`的`Project SDK`和`Project Language Level`是否正确设置为java11

### 2.编译时报错："无效的源发行版: 11"

![image-20220920221326863](/img/Hello,Halo—Halo框架入门(一)/image-20220920221326863.png)

~~试了https://segmentfault.com/a/1190000023536478等网上搜到的许多方式发现都没有鸟用，浪费了一个多小时编译不了。试了将环境变量中的jdk也改成11还是不行。~~

后来自己摸索，查看各种配置中的jdk是否为java11，最终发现了问题所在：
`File | Settings | Build, Execution, Deployment | Build Tools | Gradle`

![image-20220920222900122](/img/image-20220920222900122.png)

将这里的Gradle JVM设置为11即可。

### 3.启动springboot时报错："Error running Application. Command line is too long. Shorten the command line and rerun."

点击自动修复shorten command line and rerun即可。


<hr>
```log
2022-09-20 22:31:14.688  INFO 21196 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo started at         http://127.0.0.1:8090
2022-09-20 22:31:14.689  INFO 21196 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo admin started at   http://127.0.0.1:8090/admin
2022-09-20 22:31:14.689  INFO 21196 --- [  restartedMain] run.halo.app.listener.StartedListener    : Halo has started successfully!
```

看到启动成功的日志，至此，halo的启动准备工作就完成了。