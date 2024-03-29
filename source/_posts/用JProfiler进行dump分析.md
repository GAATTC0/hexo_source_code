---
title: 用JProfiler进行dump分析记
categories:
  - 学习
  - java
tags:
  - 学习心得
  - java
img: '/img/jprofilter10.0.jpg'
abbrlink: 80a0aeb
date: 2020-12-30 16:46:53
---

# dump分析

> 工具：[JProfilter10.0](https://gaattc.lanzous.com/iWNckjv8fgj)
>
> 激活码：L-qOQRsFcEcF-LqVM1lqxQm#1437

### 0.使用工具JProfiler载入dump.hprof文件

![](/img/image-20201230142646333.png)

### 1.首先打开Biggest Objects，看到一个6G的ArrayList，明显有问题

![](/img/image-20201230142012452.png)

### 2.右键之，选择Use Selected Instances，然后下拉框选择Outgoing references

![](/img/image-20201230142356820.png)



![](/img/image-20201230142432445.png)

### 3.展开发现其长度达到四千万，且都是相同数组元素

<font color="red" size="4">故认定这是个填报的笛卡尔积问题</font>

![](/img/image-20201230143230570.png)

### 4.再寻找引用，选择Incoming reference，点击Show Paths To GC Root

![](/img/image-20201230143843921.png)

可以发现是线程 http-apr-8080-exec-55 的栈的引用

### 5.点击Go To Start

![](/img/image-20201230144424412.png)

### 6.依次选择如图选项，选择http-apr-8080-exec-55线程，点击Calculate inspection and create a new object set

![](/img/image-20201230144907513.png)

### 7.再次选择Outgoing reference，然后ctrl+F搜索ReportSessionIdInfo

![](/img/image-20201230145258394.png)

### 8.找出问题模板，可以从模板设计和填报数据两个方面分析

![](/img/image-20201230145450925.png)

### 9.结论

考虑是填报时的输入数据有误，当数据库记录中有多条记录的某个字段相同，例如上面的id有重复，当把这个字段作为单元格值的过滤条件时，单元格会有多个值，数据的过滤关系丢失，填报时计算笛卡尔积占用过多内存资源导致宕机。