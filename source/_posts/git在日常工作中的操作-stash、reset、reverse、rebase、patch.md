---
title: 'git在日常工作中的操作:stash、reset、reverse、rebase、patch'
categories:
  - 学习
  - git
tags:
  - git
abbrlink: 44ee9398
date: 2021-08-10 09:53:20
img: /img/111git.jpg
---

# git在日常工作中的操作:stash、reset、reverse、rebase、patch

> 到现在已经工作了一个月了，虽然说提交的代码量和pr屈指可数，但还是发现曾经学的git的基本clone、add、commit、pull、push操作不够用了。
> 因为涉及到分支、多任务代码混乱、错误提交回滚等，现学现用不是长久之计，将它们总结整合和记录下来吧~

其实git还是有很多其他功能的，比如`charry pick`、`rebase`等，我还没有用到过，以后有机会补上。

## stash

> 使用场景：在一个开发任务还没有完成的时候，突然来了一个紧急bug任务要改代码。此时就会有两份修改，若要提交修改bug的代码，开发的未完成代码也会一起提交上去，那么怎么才能备份之前的半成品修改，恢复到一个干净状态来改bug呢？

这种情况就可以使用到git的功能stash(储藏)了。<font color=red>前提是要储藏的修改还没有被commit，</font>也就是说储藏是针对于本地工作目录(working dir)和暂存区(index)的修改的。

### 1.储藏

**命令行操作：**

```bash
git stash
```

建议stash的时候加上类似commit时的message用于记录信息，所以一般使用可以是这样：

```bash
git stash save "message"
```

**IDEA操作：**

直接右键`git -> stash changes`或者在导航栏处找到`stash changes`，

<img src="/img/image-20210810141926061.png" style="zoom: 67%;" />

然后：

<img src="/img/image-20210810142453927.png" style="zoom: 80%;" />

注意的是这个keep index选项，一般是不选的，它的意义是只储存工作目录的更改而不储存暂存区的更改，一般我记得idea设置了自动add的，所以一般都是在咋暂存区的，有特殊需要也可以根据实际情况选择。

### 2.查看储存

**命令行操作：**

```bash
git stash list
```

结果类似下面这样，上面是最新的，类似于栈的结构：

```bash
stash@{0}: On 5.1: test_stash
stash@{1}: On 5.1: test
stash@{2}: On 5.1: selfCricle
```

**IDEA操作：**

和第一步一样的地方，选择UnStash changes，出现如下界面：

<img src="/img/image-20210810143721633.png" style="zoom: 80%;" />

能看到stash的列表以及message。这里面有几个选项：

- view是查看选中的stash的详情，具体到哪个文件的哪个修改，和merge时一样。
- drop是删除此条stash
- clear是删除本仓库的所有stash
- pop stash选项是类似于出栈操作，即恢复后将备份删除掉，不选的话就相当于只是应用更改，stash会仍然存在
- reinstate index选项：如果不选的话这个stash是恢复到工作目录的，选了就相当于是又给这些修改执行了一次add

### 3.恢复

**命令行操作：**

```bash
# 查看stash list时可以发现，每个stash都有一个序号格式为stash@{num}，建议恢复时按照此格式：
git stash pop stash@{num}
git stash apply stash@{num}
```

当然了，IDEA里的图形化界面方便太多了，具体使用见第二节已经写过了

### 4.删除

**命令行操作：**

```bash
git stash drop stash@{num}
git stash clear
```

## reset

> 使用场景：经常有人提交几个模块的代码pr，一些已经合并了一些还没合，在这期间我如果拉了代码就很可能产生依赖缺失等问题，但我等不及他合并就要本地先能编译起来，此时就需要回滚操作了，reset就可以将本地的代码和任意一次历史提交同步，我愿称之为神器~

**IDEA操作：**

<img src="/img/image-20210810151631563.png" style="zoom:80%;" />

这里的reset type有三种，都是恢复到某一次commit，但是对于本地的修改范围不同：

- mixed：只恢复暂存区不恢复工作目录
- soft：虽然恢复到指定的commit版本，但是不恢复本地工作目录和暂存区
- hard：两者都恢复，也就是说在这个版本之后的本地修改都会被清除

(我自己这种情况，没改什么东西，就直接hard了简单粗暴)

另外，To Commit默认是HEAD即最新的commit，也可以填上需要恢复到的commit的前8位SHA即commit_id。

**命令行操作：**

idea太好用了，所以命令行还没看过，以后有需要补上。

## reverse

> 使用场景：commit有问题或者commit错了，需要撤回(虽然不一定是真的撤回了)

在IDEA或者sourcetree都可以很方便地查看和执行撤回操作。在IDEA的git log界面或者sourcetree的history界面，选择一个commit，右键选择`reverse commit`或者`revert commit`名字不一样其实是一样的。

这个操作的原理是提交一次新的commit来将需要reverse的那个commit里的修改恢复掉。比较适合于已经不小心push了的commit，当然多提交一次不好看。

也可以使用命令行：

```bash
git revert <commit_id>
```

### undo

<font color=red>而如果要撤回的commit还没有push，可以使用IDEA的undo commit.</font>

undo commit的原理是清除掉本地的commit记录，然后恢复这次commit所修改的内容。

**两种操作回滚commit后都要push才能在远端生效。**

## rebase

还没有用到过，算是一个todo先留着。

## patch

> 应用场景：生成一个patch补丁文件，记录了一些修改信息，可以用于给别人方便使用或者自己备份。

### 生成patch

**命令行：**

```bash
# 生成从当前commit往前n个commit的patch文件，有几个commit就会生成几个.patch文件，并且默认文件名从最早提交的commit 0001编号
git format-patch -n
# 生成从指定commit_id(包含该commit)往前n个commit的patch文件
git format-patch commit_id -n
# 单独生成某个commit的patch
git format-patch commit_id -1
```

**IDEA或者sourcetree：**

![](/img/image-20210810162347763.png)

### 使用patch

```bash
# 检查patch文件
git apply --stat xxx.patch
# 检查能否应用成功
git apply --check xxx.patch
# 应用patch
git apply xxx.patch
```