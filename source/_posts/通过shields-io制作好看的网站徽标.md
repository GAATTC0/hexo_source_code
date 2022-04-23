---
title: 通过shields.io制作好看的网站徽标
tags:
  - 分享
categories:
  - 日常
  - 分享
img: >-
  https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210516193249220.png
abbrlink: 21eb916f
date: 2021-05-16 19:20:10
---

# 通过shields.io制作好看的网站徽标

<font color=#3a89df size=5>本文还在更新中~</font>

> 细心留意，会发现有很多网站都有这种徽标，在我苦苦寻找之后，终于搞明白啦

传送门：[shields.io官网](https://shields.io/)

## 1.示例

这些徽标本质是图片，但是有：

- 很丰富的风格、颜色、logo可供自定
- 并且支持html、markdown、asciiDoc、reStructuredText等等,虽然后两种不知道是啥哈哈
- 支持一定格式的请求来达到信息的动态展示效果。

**比如markdown：**

![](https://img.shields.io/badge/Auth-GAATTC-3790ee?style=flat&logo=Google)

**html(嵌入a标签超链接):**

 <a target="_blank" href="https://gaattc.top"><img src="https://img.shields.io/badge/Auth-GAATTC-3790ee?style=flat&logo=Google" title="很高兴遇到你"></a>

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210516193249220.png)

## 2.制作静态徽标

按照如下任意一种规则写url即可：

```url
https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>
https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>
```

label: 标签名

message: 信息

color: 自定义颜色，支持颜色名、hex、rgb等多种表达方式。

**几个规则:**

标签名和信息中：

- `--`代表`-`
- `__`代表`_`
- `_`or` space`代表`space`

颜色名可以有：

![brightgreen](https://img.shields.io/badge/-brightgreen-brightgreen)![green](https://img.shields.io/badge/-green-green)![yellowgreen](https://img.shields.io/badge/-yellowgreen-yellowgreen)![yellow](https://img.shields.io/badge/-yellow-yellow)![orange](https://img.shields.io/badge/-orange-orange)![red](https://img.shields.io/badge/-red-red)![blue](https://img.shields.io/badge/-blue-blue)![lightgrey](https://img.shields.io/badge/-lightgrey-lightgrey)
![success](https://img.shields.io/badge/-success-success)![important](https://img.shields.io/badge/-important-important)![critical](https://img.shields.io/badge/-critical-critical)![informational](https://img.shields.io/badge/-informational-informational)![inactive](https://img.shields.io/badge/-inactive-inactive)
![blueviolet](https://img.shields.io/badge/-blueviolet-blueviolet)![ff69b4](https://img.shields.io/badge/-ff69b4-ff69b4)![9cf](https://img.shields.io/badge/-9cf-9cf)

## 3.徽标样式

style属性

| `?style=plastic&logo=appveyor`       | ![plastic](https://img.shields.io/badge/style-plastic-green?logo=appveyor&style=plastic) | 立体       |
| ------------------------------------ | ------------------------------------------------------------ | ---------- |
| `?style=flat&logo=appveyor`          | ![flat](https://img.shields.io/badge/style-flat-green?logo=appveyor&style=flat) | 扁平       |
| `?style=flat-square&logo=appveyor`   | ![flat-square](https://img.shields.io/badge/style-flat--square-green?logo=appveyor&style=flat-square) | 扁平去圆角 |
| `?style=for-the-badge&logo=appveyor` | ![for-the-badge](https://img.shields.io/badge/style-for--the--badge-green?logo=appveyor&style=for-the-badge) | 大方块？   |
| `?style=social&logo=appveyor`        | ![social](https://img.shields.io/badge/style-social-green?logo=appveyor&style=social) | 社交样式   |

## 4.logo

①logo属性

支持如下logo：

```
bitcoin, dependabot, discord, gitlab, npm, paypal, serverfault, stackexchange, superuser, telegram, travis
```

②但是太少了，所以接着看：

[simpleicons官网](https://simpleicons.org/)

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210516195012065.png)

这里提供了大量logo可供选择(这不比fontawesome强多了？🥴)

使用方法就是参数加上

```
?logo=<logo名>
```

即可。

③自定义logo，利用base64为图片编码

```
?logo=data:image/png;base64,…
```

有很多在线工具如[站长之家](http://tool.chinaz.com/tools/imgtobase/)可以使用，比较方便，但是request headers限制在8192 B，所以不支持太大的图片。

## 5.其他参数

待更新，偷个懒休息一下~~~

先看官网吧

## 6.动态徽标

待更~~~