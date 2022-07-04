---
title: HEXO之live2d插件
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: '/img/14.jpg'
abbrlink: b7997eb8
date: 2020-11-21 11:11:27
---

# HEXO之live2d插件

## 1.参考链接

官方：https://www.npmjs.com/package/hexo-helper-live2d

参考：https://www.jianshu.com/p/3a6342e16e57

## 2.安装插件

首先检查博客主目录下面的  `package.json`里是否有`"hexo-helper-live2d": "^3.0.3",`依赖，有的话可以先卸载，使用命令：

```bash
npm uninstall hexo-helper-live2d
```

之后再安装：

```bash
npm install --save hexo-helper-live2d
```

## 3.挑选模型

[模型下载](https://gaattc.lanzoui.com/i3lrbilvkej)

解压后packages里每个文件夹是一个模型，挑选需要的复制到hexo根目录下`/node_modules`中。

[模型预览](https://blog.csdn.net/wang_123_zy/article/details/87181892)

## 4.更改配置

hexo根目录的_config.yml中配置live2d。

```yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-tororo #改为自己需要的
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true #移动端是否开启
  react:
    opacity: 0.7
```

## 5.live2d与不蒜子冲突的解决

**不解决将导致显示问题和hexo clean后live2d模型丢失问题！！**

参考：https://github.com/blinkfox/hexo-theme-matery/issues/458

<left><img src="/img/Snipaste_2020-11-17_19-03-50.jpg" style="zoom:67%;" />

不蒜子js文件目录：

```
hexo\themes\hexo-theme-matery-master\source\libs\others\busuanzi.pure.mini.js
```

大佬提供的代码：

```javascript
var bszCaller,bszTag;!function(){var c,d,e,a=!1,b=[];ready=function(c){return a||"interactive"===document.readyState||"complete"===document.readyState?c.call(document):b.push(function(){return c.call(this)}),this},d=function(){for(var a=0,c=b.length;c>a;a++)b[a].apply(document);b=[]},e=function(){a||(a=!0,d.call(window),document.removeEventListener?document.removeEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.detachEvent("onreadystatechange",e),window==window.top&&(clearInterval(c),c=null)))},document.addEventListener?document.addEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){/loaded|complete/.test(document.readyState)&&e()}),window==window.top&&(c=setInterval(function(){try{a||document.documentElement.doScroll("left")}catch(b){return}e()},5)))}(),bszCaller={fetch:function(a,b){var c="BusuanziCallback_"+Math.floor(1099511627776*Math.random());window[c]=this.evalCall(b),a=a.replace("=BusuanziCallback","="+c),scriptTag=document.createElement("SCRIPT"),scriptTag.type="text/javascript",scriptTag.defer=!0,scriptTag.src=a,document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)},evalCall:function(a){return function(b){ready(function(){try{a(b),scriptTag.parentElement.removeChild(scriptTag)}catch(c){bszTag.hides()}})}}},bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",function(a){bszTag.texts(a),bszTag.shows()}),bszTag={bszs:["site_pv","page_pv","site_uv"],texts:function(a){this.bszs.map(function(b){var c=document.getElementById("busuanzi_value_"+b);c&&(c.innerHTML=a[b])})},hides:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="")})},shows:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="inline")})}};
```

