---
title: IDEA编译找不到符号的常见解决方法
categories:
  - bug
  - git
tags:
  - bug
abbrlink: e9adbdf0
date: 2021-09-01 18:56:56
img: https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210901190449899.png
---

# IDEA编译找不到符号的常见解决方法

## 1.清空target重新编译

在Project Structure -> Modules设置中找到编译路径，将其中的class文件都删除掉，再重新编译

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210901190144197.png)

## 2.⭐用maven脚本更方便地清空编译文件

在Run/Debug Configurations中添加一个maven脚本，设置工作目录为工程的根目录，命令行写`clean`即可。

<img src="https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210901190449899.png" style="zoom: 67%;" />

## 3.清除缓存再重新编译

上方导航栏 -> File -> invalidate caches：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210901191009796.png)

## 4.统一编码格式

在设置 -> Editor -> File Encodings中，设置编码格式统一：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210901191226473.png)

## 5.否则

那可能就是没拉最新的代码吧，或者没更新依赖，都试试基本就可以解决了。