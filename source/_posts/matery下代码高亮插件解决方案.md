---
title: matery下代码高亮插件解决方案
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: '/img/20210210163912.png'
abbrlink: 7255f3e0
date: 2020-11-21 11:33:23
update: 2020-11-26 22:25:36
---

# matery下代码高亮插件解决方案

> 我的prism_plugin插件装了有bug不显示，故使用prismjs方案。

## 1.首先检查冲突

如果装了prism_plugin插件请卸载：

```bash
npm uninstall -S hexo-prism-plugin
```

## 2.配置

打开根目录下的`_config.yml`文件，禁用highlight：

```yml
highlight:
  enable: false
```

然后启用prismjs：

```yml
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```

## 3.下载自定义js和css文件

自定义可以使用官方下载地址：https://prismjs.com/download.html

常用java技术栈和前端等可以用[我的配置](https://gaattc.lanzoui.com/is2Qcily2wh)  <- 点击下载

## 4.手动安装

把下载的`prism.js`、`prism.css`放置到 `hexo\themes\hexo-theme-matery-master\source\js\prism` 目录下，没有就mkdir，即

```
hexo\themes\hexo-theme-matery-master\source\js\prismprism.js
hexo\themes\hexo-theme-matery-master\source\js\prismprism.css
```

## 5.js配置

在目录`hexo\themes\hexo-theme-matery-master\layout\_partial`下的head.ejs文件中添加代码：

```javascript
<link rel="stylesheet" href="/js/prism/prism.css">
```

<left><img src="/img/image-20201121114943495.png" alt="image-20201121114943495" style="zoom: 50%;" />

然后在相同目录下的footer.ejs中添加以下代码：

```javascript
<script src="/js/prism/prism.js" async></script>
```

<left><img src="/img/image-20201121115217280.png" alt="image-20201121115217280" style="zoom: 67%;" />

## 6.hexo配置

在根目录下的`_config.yml`文件，添加以下配置：

```yml
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
marked:
  langPrefix: line-numbers language-
```

## 7.效果

> 我使用的是TOMORROW NIGHT主题，在java语言下的效果

<left><img src="/img/image-20201121120052274.png" alt="image-20201121120052274" style="zoom:50%;" />

## 8.更新：如果没效果要检查是否安装了hexo-inject

在根目录下的package.json文件中看看有没有`"hexo-inject": "^1.0.0"`这一项，没有则需要安装：

```bash
npm i hexo-inject -s
```

