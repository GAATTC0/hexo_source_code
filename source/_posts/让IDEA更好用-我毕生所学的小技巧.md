---
title: 让IDEA更好用(毕生所学的小技巧)
tags:
  - 分享
categories:
  - 日常
  - 分享
img: >-
  https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928111836920.png
abbrlink: 42dd4c
date: 2021-09-28 09:25:24
---

# 让IDEA更好用(毕生所学的小技巧)

> 还在更新中...

## 一、常规篇

### 1.字体布局

#### ①编译器字体

`Settings -> Appearance&Behavior -> Appearance`:

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928102636561.png" style="zoom: 67%;" /> 

#### ②代码字体

`Settings -> Editor -> Font`:

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928102941315.png" style="zoom:67%;" />

consolas, yyds.

### 2.折叠中间包

当包路径很多时，中间可能会有很多的空包，这样要手动点开每一个就很麻烦，compact可让这些空的包一次性展开为一个包的样子，报名之间用"."分隔，既方便又美观：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928103454360.png" style="zoom:67%;" />

### 3.Tab数量控制

idea的默认tab数量是有限制的，一行显示满了再打开新的tab就会折叠，超过数量限制还会关闭旧的tab，这样非常不便于调试和查看，所偶一将其修改为多行显示：

`Settings -> Editor -> General -> Editor Tabs`:

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928110635358.png)

先关闭`Show tabs in one row`,然后下面有一个关闭策略：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928110758987.png)

把这个Tab limit的数值调大亿点即可，这样以来就可以多行显示了。

### 4.防止自动将多个import替换为import *

idea在一些情况下会将同一个包中的多个import语句合为一条`import *`，但是在很多代码规范里这是不允许的，将其设置一下不去自动替换import，

`Settings -> Editor -> Code Style -> Java`：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928111349638.png" style="zoom:67%;" />

将下面这两个替换策略的值调大亿点即可。

### 5.自动导包和删除

`Settings -> Editor -> General -> Auto Import -> Java`：

![image-20211007111153595](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211007111153595.png)

选择自动将粘贴的代码中的类import、自动import类名不冲突的类、自动去掉无效的import。

### 6.File Header

`Settings -> Editor -> File and Code Templates`：

右侧添加一个File Header，这样新建一个类的时候会自动根据配置在类的上方添加注释信息，其中还可以定义一些环境变量，如：

{DATE}、{TIME}、{USER}、{PACKEGE_NAME}等。

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928113902841.png" style="zoom:50%;" />

### 7.比较不同

这个文档比较功能比word那些的好用多了，可以直接在某个文件的任意位置右键选择`Compare With Clipboard`，就可以将其和剪贴板中的文字进行比较了，并且非常详细和美观，当然前提时要先复制一份要比较的代码，另外，还可以选中一段代码进行比较，这个也很方便：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210929141513924.png)

还有一个是不用复制的比较方法，对整个文件进行对比，在某个文件右键选择`Compare With`然后选择另一个文件即可。

### 8.提示符忽略大小写

如果觉得大小写来回切换很麻烦，那么可以设置忽略大小写，

`File –> settings –> Editor –> General -> Code Completion`：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211007105913688.png)

将Match case取消勾选即可，若如此做，首字母大小写不同的字符都会被用作提示了，但是感觉也带来一些问题，就是精度会降低，毕竟参与提示的字符会变多，就像打字一样，提示的词汇太多反而不好找了。

### 9.背景图

`Settings -> Appearance&Behavior -> Appearance -> UI Options -> Background Image`

### 10.ide内存占用

有时编辑大文件会卡顿和提示"low memory"，默认Xmx时1773M，可以手动设置一下，`navi -> Help -> Edit Custom VM Options`:

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20220303195925709.png" style="zoom: 50%;" />

**适当**调整一下，如：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20220303200140504.png)

### 11.过长自动换行

`Settings -> Editor -> Code Style`：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20220422101315769.png" style="zoom:67%;" />

### 12.import格式

`Settings -> Editor -> Code Style -> Java-> imports`：

import layout:

这里可以自定义import的格式，可以将自定义的包名添加规则格式化时自动移到指定位置，且可以在指定包名之间添加空行，还有静态引用单独一个区域等。

## 二、插件篇

### 1.Translation

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928104018440.png)

划线翻译、文档翻译、翻译并替换，还是很好用的。支持google、有道、百度翻译，但是综合来看还是google更准确一些，就是时常会有一些网络问题，可以在设置里勾选使用tanslate.google.com，

`Settings -> Tools -> Translation`：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928141415379.png)

### 2.Rainbow  Brackets

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928105851220.png)

对比了无数主题，发现还是idea自带的darcula主题看着舒服，但是缺点是高亮的太少了，一大堆代码大部分都是灰色的，看起来很费劲，所以包括括号什么的，使用这个彩虹括号插件就可以让界面更美观、代码结构更清晰，就不上图了，体验过的都说好。

### 3.Nyan Progress Bar

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928105905553.png)

让进度条变成彩虹猫，本来枯燥缓慢的进度条好像变得更快了呢！

### 4.IDE Eval Reset

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928105918726.png)

[下载传送门](https://gaattc.lanzoui.com/iMkxyulpvda)

这是一个无限试用idea的破解插件，之前一直是用的lookdiv的激活码，但是现在jetbrains查的严不好用了，建议还是用这个一劳永逸。

**使用方法：**

1. 首先，下载破解插件压缩包，将其放在一个安全的路径，<font color=red>插件安装后不要移动和删除，也不能更新IDEA</font>，否则破解插件会失效；
2. 新建一个项目，将压缩包直接拖进编译器，然后重启编译器；
3. 重新启动后在顶部的导航栏`help`中，最后一行会出现一个`Eval Reset`选项，打开后右下角有一个![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928140810450.png)选项，勾选之，这样就会在每次重启前自动重置试用期限了。

> code with me功能还不能试用，查看会发现没有激活，但是令人惊喜的是没激活也可以直接使用233

### 5.Code With Me

这个应该算是一个官方插件，在2021的新版本是集成在IDE中的，根据第四条，可以直接使用这个强大的功能。

使用方法：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211009151210902.png)

首先点击右上角的code with me图标或者按`ctrl+shift+y`呼出这个选项界面，

然后选择第一个`enable access and copy invitation link`为邀请别人来协同编辑你本地的代码，在这之前可以进行一些权限的设置：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211009151449766.png" style="zoom: 67%;" />

第二个选项是随时可以配置(有人加入协同编辑或没有时)其他人的权限的配置。

第三个是输入别人分享的邀请链接来加入别人的代码协同编辑，其实也可以浏览器直接打开链接就行。

> 这个插件比远程控制的好处在于可以异步编辑代码，并且可以随时看到对方在编辑什么位置，也可以强制让别人的视角跟着你的位置，另外，可以很多个人同事编辑。

### 6.SequenceDiagram

一键生成时序图的插件，右键或者点击右上角的图标即可。

## 三、VCS篇

### 1.IDEA使用git操作缓慢的解决方法

有时候idea使用git的一些操作变得非常慢，比如Update Project、Annotate with Git Blame、commit、查看本地的change list等。

但是有时候这不是网络问题，因为此时此刻使用命令行或者其他的客户端都很快，虽然这个问题原因还不明，但是解决方法很简单，

找到idea的安装目录下的bin目录：

```dir
%IDEA_HOME%\bin
```

有一个**runnerw.exe**文件，将其删除即可。并且对于idea的正常使用没有任何影响。

### 2.commit设置

在idea已经enable VCS后，左侧边栏会有一个commit工具栏，这里是我们经常用来提交代码的地方，在comment输入框的上方有一个commit设置，或者在设置里进入，

`Settings -> Version Control-> Commit`：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928112721237.png" style="zoom:67%;" />

#### ①Reformat code

格式化代码，这个建议勾选上，在提交时自动将代码格式化，防止平时的遗漏。

#### ②Rearrange code

这个选项的功能是在提交时将代码结构规范，将类中的成员变量定义移动到方法的上方去，当然一般来说是用不到的。

#### ③Optimize imports

去掉没有用到的import，建议勾选。

#### ④Analyze code

检查代码中的warning和error，也没啥用，比较费时间，如果有把握提交的代码没有编译问题就可以去掉了(不过我为了保险起见还是打开了这个选项

#### ⑤Check TODO

检查todo标记。

#### ⑥Cleanup

// 未知功能，但是根据一些[别人的经验](https://blog.csdn.net/weixin_48910529/article/details/119171822)来看，还是别用为好

#### ⑦Run Tests

运行测试。

#### ⑧Update copyright

// 暂时还没用过

### 3.新建文件自动add

`Settings -> Version Control -> Confirmation`：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928135302888.png)

选择Add silently即可在新建文件时自动add了。

### 4.shelve

在idea左侧的commit栏中，有一个shelve选项，可以在changelist中选择任意数量的文件，然后选择shelve silently，

就可以将这些改变储存起来，类似于stash操作，然年在右侧的shelf栏中就会多出来你储存的更改，可以随时选择unshelve进行恢复(这里的恢复相当于stash的apply操作而不是pop，也就是说不会因为恢复而删除这个存储)，也可以重命名和删除等操作，总体来说比stash方便很多。

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210928150918644.png)

### 5.Change List

其实有时候使用stash或者使用shelve来贮存更改，还是有时候不够实用，因为没法细腻精确地控制更改，尤其是在同一个文件中需要区分的情况。此时，changelist的功能就显得非常实用了。

在修改了的地方点击即可看到代码的变化，这里就能看到changelist，可以手动将这处更改添加到一个新的changelist中，所有的修改默认是在一个默认的changelist中的，即Default Changelist。

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210929135603293.png)

另一个要用到的地方是在左侧导航栏的commit中：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210929140143223.png)

这里就可以看到所有的changelist了，还有一个小用处就是可以把不想提交的change隔离掉，比如这里我修改了很多pom配置，但是不能提交它们，就把它们都放到了一个changelist中，改名为ignore，顾名思义，又很方便。

右键某一个changelist中的文件时，还可以选择将其回滚或者移动到其他的changelist中。

提交代码的时候直接点击对应的changelist即可全选其中的所有的修改，不会影响其他的changelist，并且提交之后对应的changelist就会消失。

> 养成使用changelist的习惯，再也不用担心同时做好几个任务会混乱了~

### 6.Annotate With git Blame

在文件内右键选择git或者在行号栏右键都可以找到这个选项，打开后，在行号栏会展示每一行最后的修改者，~~可以用来确认是谁的bug~~，还有对应的日期，很方便，然后再次勾选可以关闭：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210929150837634.png)

### 7.远端创建新分支本地切换分支时不显示

[参考](https://blog.51cto.com/u_15345018/3653958)

执行一次git fetch即可显示。

## 四、MVN篇

### 1.maven配置文件和本地仓库配置

`Settings -> Build,Execution,Deployment -> Build Tools -> Maven`：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210930162301698.png)

这里的配置文件虽然看上去是可以覆盖自定义路径的，但是idea有时候有bug，会自己又改回去，所以建议还是直接修改他这个默认的settings.xml文件，然后将其中的本地仓库的配置修改为本地需要的路径，重新打开设置即可看到第二个仓库配置已经更新为了刚刚修改的配置了。

### 2.执行maven脚本

在Run/Debug Configurations中，添加一个maven执行配置，

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210930161526701.png" style="zoom:67%;" />

配置好Working Directory和Command line，这里就是maven的执行脚本，比如一般先执行clean再执行package。

有时候编译会出问题，可以添加一个只执行clean的，在编译之前先清空class文件，防止出现一些"找不到符号"之类的问题。

## 五、调试篇

### 1.远程调试

在Run/Debug Configurations中，添加一个Remote JVM Debug，并填写ip和调试端口：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211015155455247.png)

然后在远程的启动参数增加下面生成的命令，启动远程的项目和idea的调试就可以远程调试了。

### 2.各种断点

①普通断点

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018100708638.png)

②非启用状态的断点

右键断点，取消勾选`Enabled`即可保留断点的位置，但是将其设置为不启用的状态：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018100858431.png)

③不阻塞的断点

右键取消勾选`Suspend`,这样经过断点时不会阻塞线程：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018101043821.png)

④带条件的断点

在3.中详细说明：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018101204346.png)

⑤禁用的断点

在左侧任务栏中选择`Mute Breakpoints`,就可以将所有的断点禁用：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018101401990.png)

这样所有的断点位置保留，但是会变成灰色并且不阻塞线程：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018101529033.png)

⑥异常断点

这个断点的作用是，当进程遇到被设置的特定异常时，会停留在发生异常的那一行。设置方法是ctrl+shift+F8，然后点击添加一个断点，选择`Java Exception Breakpoints`,然后选择一个异常即可：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018135933154.png)

### 3.断点条件设置

断点有时在循环或者递归等情况下，调试到想要的步骤会比较麻烦和费事，可以使用断点的条件功能，在断点上打开设置，比如下面的例子：

现在想在100次的循环种调试第99次，手动调会很慢，况且这还是最简单的情况，

```java
    void example() {
        for (int i = 0; i < 100; i++) {
            System.out.println(i);
        }
    }
```

现在可以在循环内部打上断点，设置一个条件：

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211015160559840.png" style="zoom:67%;" />

这样就可以只在i为99时生效了，一个F9就可以解决很麻烦的问题。当然这是一个很强大的功能，可以写复杂的表达式来灵活运用。

### 4.断点线程设置

断点上右键设置里，有一个Suspend项，后面有两个选项，分别是`All`、`Thread`,代表了阻塞所有线程和只阻塞当前线程，这样在多线程环境下可以根据情况避免阻塞所有线程。

### 5.watches

在调试时的variables中选择想要查看的变量右键选择`Add to Watches`,或者直接拖入右侧的watches框中，可以方便查看。

### 6.evaluate计算表达式

右键选择一段代码，或者alt+F8，或者点击调试界面的计算器图标，可以独立于原本的代码进行一些表达式的计算，用来判断当前的状态或者查看变量或者预判后面的代码等。

注意：这里能计算的代码必须是当前调试到的位置状态上的(比如当前行之前还没声明的代码时不能计算的)。

### 7.stream图形化工具

在调试stream时，可以对复杂的stream进行一个图形化展示，用来直观的查看stream的过程和结果：

调试到某个stream时，点击`evaluate`旁边的`Trace Current Stream Chain`即可，可以选择分开来看，也可以把所有操作合起来看

<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211018114909599.png" style="zoom:50%;" />

### 8.强制抛异常

在栈帧上右键可以选择`Throw Exception`，然后输入异常的表达式比如"new RuntimeException"即可。

### 9.强制返回(自定义返回值)

和强制抛异常类似，栈帧右键选择`Force Return`，如果是有返回值的方法，还需要输入一个表达式，即返回值。

## 六、标记篇

### 1.Favorites

这个相当于是浏览器的书签栏，使用方法：

右键tab标签，然后选择`add to favorites`添加所选的tab到收藏夹或者选择`add all tofavorites`添加当前打开的所有tab到收藏夹。
然后在关闭了想迅速找到收藏的tab时，点击左下角的`favorites`工具栏即可，并且支持对收藏夹进行改名、批量删除等。
另外，下面的`bookmark`和断点也是在这里都可以找到的。

### 2.Bookmark和Mnemonic Bookmark

这个和favorite类似，区别是刚才的收藏夹的目标是tab，其实也就是类，而bookmark则更精细一点，目标是行，类似于断点。使用方法：

在需要标记的行的行号栏上右键选择`add bookmark`或者按F11即可添加书签。
再次点击可以选择进行编辑描述或者删除或者改为Mnemonic Bookmark：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20211009152846672.png)

这个书签的描述默认是这行代码，展示的时候是在点击左下角的`favorites`工具栏时，里面会列举每一个书签的描述，为了方便区分和查找可以编辑一下描述。

Mnemonic Bookmark是普通书签的一种，即在普通书签的基础上增加了一个可选的26个字幕+10个数字的标识，每种不能重复。

## 七、其他

### 1.tomcat启动日志中文编码错误

淇℃伅 应该是启动时看到最多的字眼了，可以修改配置来修复中文编码错误的问题，找到`logging.properties`配置文件：

```dir
%TOMCAT_HOME%\conf\logging.properties
```

修改以下键的值为GBK即可：

```properties
1catalina.org.apache.juli.AsyncFileHandler.encoding = GBK
java.util.logging.ConsoleHandler.encoding = GBK
```

### 2.修改idea的配置文件路径

> 参考[官方说明](https://intellij-support.jetbrains.com/hc/en-us/articles/207240985-Changing-IDE-default-directories-used-for-config-plugins-and-caches-storage)

idea默认的存储位置在C盘，如：

```dir
C:\Users\{userName}\AppData\Local\JetBrains\IntelliJIdea2021.2
```

像我这种C盘分区分小了的，想要修改以腾出空间，可以对idea的配置进行修改。

将上面目录中的所有文件复制到想要迁移的新目录中,也可以不复制，直接新建目录：<font color=red>记为{custom_dir}</font>，然后修改对应的`IDE_HOME\bin\idea.properties`中的配置：

```properties
#---------------------------------------------------------------------
# Uncomment this option if you want to customize a path to the settings directory.
#---------------------------------------------------------------------
idea.config.path={custom_dir}/settings_custom
#---------------------------------------------------------------------
# Uncomment this option if you want to customize a path to the caches directory.
#---------------------------------------------------------------------
idea.system.path={custom_dir}/system_custom
#---------------------------------------------------------------------
# Uncomment this option if you want to customize a path to the user-installed plugins directory.
#---------------------------------------------------------------------
idea.plugins.path={custom_dir}/plugins_custom
#---------------------------------------------------------------------
# Uncomment this option if you want to customize a path to the logs directory.
#---------------------------------------------------------------------
idea.log.path={custom_dir}/log
```

打开idea等待更新缓存即可。