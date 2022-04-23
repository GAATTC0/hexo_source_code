---
title: IDEA修改本地maven仓库路径自动恢复默认的解决方法
categories:
  - bug
  - maven
tags:
  - bug
img: 'https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210706140726447.png'
abbrlink: f8b898cb
date: 2021-07-06 13:52:20
---

# IDEA修改本地maven仓库路径自动恢复默认的解决方法

> idea中手动修改maven配置文件和本地仓库路径后，再次刷新maven后又会自动恢复为默认的`user/.m2`这个路径，如下图。
>
> 经过百度以及多次尝试找到了解决办法~

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210706135543843.png)

## 1.首先指定一个配置文件

使用默认.m2这个路径也可以，或者在其他路径的也可以。

## 2.修改配置文件中的`localRepository`标签属性

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210706135941585.png)

如图，改为本地的仓库路径即可

## 3.重启idea

不需要再修改idea的设置，也不用点`override`,重启

会发现设置中的本地仓库路径已经变为了配置文件中添加的新路径。