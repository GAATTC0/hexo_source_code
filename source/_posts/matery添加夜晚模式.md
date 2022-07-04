---
title: matery添加夜晚模式
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: '/img/moon1217.jpg'
abbrlink: de48a9ab
date: 2020-12-17 20:46:08
update: 2020-12-18 15:49:50
---

# matery添加夜晚模式

## 1.在layout.ejs中添加按钮

在layout的body标签中添加代码。按惯例还是加在最后面尽量让页面主体先加载。

```dir
hexo\themes\hexo-theme-matery-master\layout\layout.ejs
```

```html
    <!--夜晚模式-->
    <script>
        if (localStorage.getItem('dark') === '1') {
        document.body.classList.add('dark');
        }
        else if (new Date().getHours() >= 22 || new Date().getHours() < 7) {
        document.body.classList.add('dark');
        } 
        else if (matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        }
    </script>
    <a onclick="switchNightMode()" id="sma">
        <i class="fa fa-moon-o" id="nightMode" aria-hidden="true"></i>
    </a>
```

## 2.添加css样式

```dir
hexo\themes\hexo-theme-matery-master\source\css\matery.css
```

精心适配的css：

```css
/* 深色模式按钮设置 */
#sma {
    background: #000;
    width: 30px;
    height: 30px;
    display: block;
    position: fixed;
    border-radius: 50%;
    right: 15px;
    bottom: 670px;
    padding-top: 15px;
    margin-bottom: 0;
    z-index: 998;
    cursor: pointer;
}

#sma .fa-moon-o {
    position: absolute;
    right: 8px;
    bottom: 6px;
    font-size: 1.3rem!important;
}
#sma .fa-lightbulb  {
    position: absolute;
    right: 8px;
    bottom: 6px;
    font-size: 1.35rem!important;
}

.fa-moon-o:before {
    content: "\f186";
}
.fa-comments:before {
    content: "\f086";
}
/* 深色模式设置 */
    body.dark .bg-cover .post-title,body.dark .card .card-content p,body.dark .card .card-image .card-title,body.dark .chip-container .tag-title,body.dark .fa-lightbulb:before,body.dark .fa-moon-o:before,body.dark .fas,body.dark .friends-container .tag-title,body.dark .frind-ship .title h1,body.dark .row .text,body.dark .title,body.dark .v[data-class=v] .vcount,body.dark .v[data-class=v] .vcount .vnum,body.dark a,body.dark article .article-content .summary,body.dark article .article-tags .chip,body.dark div.jqcloud a,body.dark h1,body.dark h2,body.dark h3,body.dark h4,body.dark h5,body.dark h6,body.dark header .side-nav .menu-list a,body.dark header .side-nav .mobile-head .logo-desc,body.dark header .side-nav .mobile-head .logo-name,body.dark li,body.dark p,body.dark pre code {
        color: rgba(255,255,255,.6)
    }
    
    body.dark .block-with-text:after,body.dark .card {
        background-color: #282c34
    }
    
    body.dark,body.dark #rewardModal .modal-content,body.dark .modal,body.dark .v[data-class=v] .vcount,body.dark header .side-nav,body.dark header .side-nav .menu-list .m-nav-show {
        background-color: #12121c
    }
    
    body.dark .aplayer {
        background: #2f3742!important
    }
    
    body.dark img,body.dark strong {
        filter: brightness(.7)
    }
```

> 右下角东西太多了不好看，就把按钮放右上角了。。。
> 想调整就改改#sma的bottom。

<font color=red size=5>更新：移动端按钮和全屏按钮冲突了，还是改到下面吧。。。</font>

```css
#sma {
    background: #000;
    width: 35px;
    height: 35px;
    display: block;
    position: fixed;
    border-radius: 50%;
    right: 15px;
    bottom: 190px;
    padding-top: 15px;
    margin-bottom: 0;
    z-index: 998;
    cursor: pointer;
}
```



## 3.添加按钮js

找到文件：

```dir
hexo\themes\hexo-theme-matery-master\source\js\matery.js
```

在文件末尾添加代码：

```js
// 深色模式设置
function switchNightMode() {
    var body = document.body;
    if (body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('dark', '0');
        $('#nightMode').removeClass("fa-lightbulb").addClass("fa-moon-o");
        return;
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('dark', '1');
        $('#nightMode').removeClass("fa-moon-o").addClass("fa-lightbulb");
        return;
    }
}
```

## 4.效果

![](/img/image-20201217210126248.png)