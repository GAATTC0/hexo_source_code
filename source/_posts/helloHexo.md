---
title: HelloHexo⭐⭐⭐
top: true
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: 'https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/wallhaven-4ow8qm.jpg'
abbrlink: d8e4ee89
date: 2020-11-16 11:32:56
updated: 2020-12-09 22:24:51
---

# 走近HEXO

> 我的hexo全攻略

## 一、参考链接:star:

### 1.官方文档

https://hexo.io/zh-cn/docs/

### 2.皮肤文档(matery)

https://github.com/blinkfox/hexo-theme-matery/blob/develop/README_CN.md

### 3.详细配置文档

https://yafine-blog.cn/posts/4ab2.html

### 4.LIVE2D插件

https://www.jianshu.com/p/3a6342e16e57

### 5.歌单

http://music.163.com/playlist?id=5337749378

### 6.代码高亮解决方案:star2::star2:

https://www.jianshu.com/p/f395d92a1110

首先卸载之前的prism插件！！

```bash
npm uninstall -S hexo-prism-plugin
```

### 7.valine配置:star::star:

https://www.jianshu.com/p/205aaa14dff3

https://gaattc.life/posts/708ac940/

### 8.设置二级标题:star:

https://zhangxiaocai.cn/posts/5a99eb4d.html#toc-heading-3

### 9.很多有用的操作:star:

https://zhangxiaocai.cn/categories/Hexo/

### 10.不蒜子与live2d冲突问题:star::star:

https://github.com/blinkfox/hexo-theme-matery/issues/458

<left><img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/Snipaste_2020-11-17_19-03-50.jpg" style="zoom:67%;" />

```
hexo\themes\hexo-theme-matery-master\source\libs\others\busuanzi.pure.mini.js
```

```javascript
var bszCaller,bszTag;!function(){var c,d,e,a=!1,b=[];ready=function(c){return a||"interactive"===document.readyState||"complete"===document.readyState?c.call(document):b.push(function(){return c.call(this)}),this},d=function(){for(var a=0,c=b.length;c>a;a++)b[a].apply(document);b=[]},e=function(){a||(a=!0,d.call(window),document.removeEventListener?document.removeEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.detachEvent("onreadystatechange",e),window==window.top&&(clearInterval(c),c=null)))},document.addEventListener?document.addEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){/loaded|complete/.test(document.readyState)&&e()}),window==window.top&&(c=setInterval(function(){try{a||document.documentElement.doScroll("left")}catch(b){return}e()},5)))}(),bszCaller={fetch:function(a,b){var c="BusuanziCallback_"+Math.floor(1099511627776*Math.random());window[c]=this.evalCall(b),a=a.replace("=BusuanziCallback","="+c),scriptTag=document.createElement("SCRIPT"),scriptTag.type="text/javascript",scriptTag.defer=!0,scriptTag.src=a,document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)},evalCall:function(a){return function(b){ready(function(){try{a(b),scriptTag.parentElement.removeChild(scriptTag)}catch(c){bszTag.hides()}})}}},bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",function(a){bszTag.texts(a),bszTag.shows()}),bszTag={bszs:["site_pv","page_pv","site_uv"],texts:function(a){this.bszs.map(function(b){var c=document.getElementById("busuanzi_value_"+b);c&&(c.innerHTML=a[b])})},hides:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="")})},shows:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="inline")})}};
```

### 11.友情链接下面有一个空白区域

找到以下文件：

```
themes/hexo-theme-matery-master/layout/friends.ejs
```

注释掉原来的然后加上自己的东西：

<left><img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201117224030065.png" alt="image-20201117224030065" style="zoom:67%;" />

### 12.自定义valine:star:(第七条的补充)

https://gaattc.life.io/posts/708ac940/

### 13.更改鼠标指针:star::star:

#### ~~法一：~~

> ref:https://yafine-blog.cn/posts/8c84.html

#### (推荐)法二：

找到文件：

```
hexo\themes\hexo-theme-matery-master\source\css\my.css
```

增加样式：

```css
*{
    cursor: url("/medias/Arrow.cur"),auto!important;
}
a,button,img{
    cursor: url("/medias/pointer.cur"),auto!important;
}
```

其中cursor.ico就是指针图，比如：![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/cursor.ico)或![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/cursor.cur)或![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/Arrow.cur)或![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/normal.cur)

### 14.评论推送服务

详见[另一篇文章](https://gaattc.life.io/posts/708ac940/)

### 15.增加跳转评论按钮

https://blog.csdn.net/cungudafa/article/details/106278206

### 16.修改滑动条

https://blog.csdn.net/cungudafa/article/details/106278206

### 17.访问优化

https://blog.sky03.cn/posts/42790.html#toc-heading-5

https://blog.sky03.cn/posts/1663.html

### 18.文章详情卡片透明度

```dir
hexo\themes\hexo-theme-matery-master\source\css\matery.css
```

修改两个透明度：

```css
#artDetail .card {
    box-shadow: 0 10px 35px 2px rgba(0, 0, 0, .15),
        0 5px 15px rgba(0, 0, 0, .07),
        0 2px 5px -5px rgba(0, 0, 0, .1) !important;
    opacity: 0.85;
}

#artDetail .article-card-content {
    padding: 0 15px 20px 18px;
    opacity: 1;
}
```

### 19.文章短链接

https://github.com/rozbo/hexo-abbrlink

### 20.WebStackPage导航

https://zhangxiaocai.cn/posts/38b34c3c.html

(html和静态资源是偷来的,希望他不会生气)

### 21.全屏浏览按钮

也是从楼上那位大佬处偷来的~

①把下面文件放在js目录下：

```url
https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/fullscreen.js
```

②在文件：

```dir
hexo\themes\hexo-theme-matery-master\layout\_partial\navigation.ejs
```

添加代码(一般加在搜索栏右边美观点吧)：

```html
<li id="fullscreen_li" class="fullscreen"><a href="javascript:void(0);" class="modal-trigger waves-effect waves-light"><i id="fullscreen" class="fas fa-expand-arrows-alt" title="全屏" style="zoom: 0.65;"></i></a></li>
```

③在文件：

```dir
hexo\themes\hexo-theme-matery-master\layout\layout.ejs
```

添加代码：

```html
<!--全屏-->
<script src="/js/fullscreen.js" type="module"></script>
```

### 22.TOC目录样式美化

```dir
hexo\themes\hexo-theme-matery-master\layout\_partial\post-detail-toc.ejs
```

修改：

```css
.toc-widget {
        width: 345px;
        padding-left: 20px;
        background-color: rgb(255, 255, 255,0.7);
        border-radius: 10px;
        box-shadow: 0 10px 35px 2px rgba(0, 0, 0, .15), 0 5px 15px rgba(0, 0, 0, .07), 0 2px 5px -5px rgba(0, 0, 0, .1) !important;
    }
```

## 23.图片懒加载

参考链接：https://blog.sky03.cn/posts/42790.html#toc-heading-10

其中提前开始加载的修改要在第11行而不是第九行，总之就是：

```javascript
function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.bottom >= 0
        && rect.left >= 0
        && rect.top <= (window.innerHeight + 240 || document.documentElement.clientHeight + 240)
    );
}
```

## 二、常用命令:star::star:

### 1.Create a new post

``` bash
$ hexo new <POST_NAME>
```

More info: [Writing](https://hexo.io/docs/writing.html)

### 2.Run server

``` bash
$ hexo server
//or
$ hexo s
```

More info: [Server](https://hexo.io/docs/server.html)

### 3.Generate static files

``` bash
$ hexo generate
//or
$ hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### 4.Deploy to remote sites

``` bash
$ hexo deploy
//or
$ hexo d
```

### 5.Deploy on gitee

https://gitee.com/GAATTC/gaattc/pages<img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201116155556274.png" alt="image-20201116155556274" style="zoom: 67%;" />

### 6.Visit site

```
//browser:
gaattc.life
```

## 三、POST:star::star:

### 1.新建post

```bash
$ hexo new <POST_NAME>
```

### 2.编辑post

**①路径：**

```
%HEXO_ROOT%/source/_posts
```

**②或新建文章自动打开本地 Markdown 编辑器(recommend)：**:star:

在站点根目录下新建 `scripts` 目录，然后在新建 `auto_open.js`，在文件填入一下内容：

```javascript
var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "D:\Program Files\Typora\Typora.exe" ' + data.path);
});
```

其中 `"D:\Program Files\Typorae\Typora.exe"` 是本地编辑器的路径示例。

### 3.Front-matter

格式：

```yml
title: HelloHexo
date: 2020-11-16 11:32:56
updated: 2020-11-17 21:24:15
top: false
categories:
- 学习
- hexo
tags:
- 学习心得
- hexo
img: https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/yaoshuixiedaima.jpg
```

### 4.图床(PicGo)

https://github.com/GAATTC0/MyPicGoOSS

<left><img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201119093006186.png" alt="image-20201119093006186" style="zoom: 50%;" />

> 插入图片会默认居中，在图片前添加``<left>``标签即可左对齐

### 5.保存更新部署

完成一篇大作~

--------------------------------------------------------------------到底啦-----------------------------------------------------------------------------