---
title: Valine+matery全攻略⭐⭐
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: 'https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/20210210163622.png'
abbrlink: 708ac940
date: 2020-11-21 12:23:52
update: 2020-12-09 22:24:50
---

# Valine+matery全攻略

> 官方文档：https://valine.js.org
> ref:https://www.jianshu.com/p/205aaa14dff3
> https://zhangxiaocai.cn/posts/358175a6.html
> https://www.cnblogs.com/guoxinyu/p/12660236.html
> 版本：v1.4.14

<font color='red' size=4>**注意：本文有重要更新，更新内容单独写在最后面**</font>

## 1.LeanCloud注册&创建应用

[leancloud官网](https://www.leancloud.cn/)

创建应用：

<left><img src="https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201121123052704.png" alt="image-20201121123052704" style="zoom: 60%;" />


获取key：

<left><img src="https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201121123240863.png" alt="image-20201121123240863" style="zoom:66%;" />


## 2.配置文件

matery主题已经集成了Valine，直接在主题的配置文件中修改：

```yml
valine:
  enable: true
  appId: <你的这个>
  appKey: <你的那个>
  notify: false
  verify: false
  visitor: true
  avatar: 'retro' # Gravatar style可选 : mm/identicon/monsterid/wavatar/retro/hide
  pageSize: 10 #一页显示条数
  placeholder: '有什么不懂的问题，可以问我们，我们会亲切地告诉你们：听不见！  ——森下下士' # Comment Box placeholder
  background: /medias/bg.webp
```

## 3.可以将 nick、email、link 输入框分开(但没必要)

在目录

```
hexo\themes\hexo-theme-matery-master\source\css
```

中找到matery.css样式表，添加如下代码：

```css
#vcomments .vheader .vnick {
      width: 31%;
      border: 2px solid #dedede;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px
}

#vcomments .vheader .vmail {
      width: 31%;
      border: 2px solid #dedede;
      margin-left: 34px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px
}

#vcomments .vheader .vlink {
      width: 31%;
      border: 2px solid #dedede;
      margin-left: 34px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px
}
```

## 4.鼠标over时头像旋转(这个海星)

同样是上面的css文件中添加：

```css
img.vimg {
     transition: all 2s   /* 旋转时间为 2s */
}

img.vimg:hover {
     transform: rotate(360deg);
     -webkit-transform: rotate(360deg);
     -moz-transform: rotate(360deg);
     -o-transform: rotate(360deg);
     -ms-transform: rotate(360deg);
}
```

## 5.评论卡片样式(也海星)

同样是上面的css文件中添加：

```css
#vcomments .vcards .vcard {
    padding: 15px 20px 0 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .12);
    transition: all .3s
}

#vcomments .vcards .vcard:hover {
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, .12)
}

#vcomments .vcards .vcard .vh .vcard {
    border: none;
    box-shadow: none;
}
```

## 6.增加博主、小伙伴标识以及浏览器图标(建议⭐)

将原生的 Valine 文件替换为下面的 `Valine.min.js` 文件目录为：

```
hexo\themes\hexo-theme-matery-master\source\libs\valine\Valine.min.js
```

用这个替换：[Valine.min.js](https://gaattc.lanzoui.com/iBXAHilyrte)

可以在valine.ejs中多设置几个参数：

|      参数       |     类型     |                说明                |           默认           |                     示例                     |
| :-------------: | :----------: | :--------------------------------: | :----------------------: | :------------------------------------------: |
|     tagMeta     |    Array     |          标签要显示的文字          | [“博主”,“小伙伴”,“访客”] |           [“博主”,“小伙伴”,“访客”]           |
|     master      | Array/String |        md5 加密后的博主邮箱        |            []            |     [“fe01ce2a7fbac8fafaed7c982a04e229”]     |
|     friends     |    Array     |       md5 加密后的小伙伴邮箱       |            []            |     [“fe01ce2a7fbac8fafaed7c982a04e229”]     |
| metaPlaceholder |    Object    |       meta placeholder 内容        |            {}            | {“nick”:“昵称 / QQ 号”,“mail”:“邮箱 (必填)”} |
|     verify      |   Boolean    | 评论时是否需要验证，需 jQuery 支持 |          false           |                     true                     |

valine.ejs文件路径：

```
hexo\themes\hexo-theme-matery-master\layout\_partial
```

举例：

```javascript
new Valine({
        el: '#vcomments',
        appId: '<%- theme.valine.appId %>',
        appKey: '<%- theme.valine.appKey %>',
        notify: '<%- theme.valine.notify %>' === 'true',
        verify: '<%- theme.valine.verify %>' === 'true',
        visitor: '<%- theme.valine.visitor %>' === 'true',
        avatar: '<%- theme.valine.avatar %>',
		metaPlaceholder: {"nick":"昵称/QQ号o(*￣▽￣*)o","mail":"你的邮箱( ‵▽′)ψ","link":"你的网站url(/▽＼)"},
        pageSize: '<%- theme.valine.pageSize %>',
        lang: '<% if (config.language == "zh-CN") {  %>zh-cn<% } else { %>en<% } %>',
        placeholder: '<%= theme.valine.placeholder %>',
    	tagMeta: ["博主","小伙伴","访客"],     //标识字段名
		master: 'b576507dc8ba83a09ecfdfd257c7e9f9',  //博主邮箱md5
		friends: ["103fa56afdf5169533b296368ce31d84"],  //小伙伴邮箱Md5
		enableQQ: true,
    });
```

## ~~7.微信消息推送(墙裂建议⭐)~~后面有更新，所以这个作废

> 本博客使用Server酱实现，因为简单~也可以使用[Qmsg酱](https://qmsg.zendee.cn/)实现qq推送

[Server酱官网](http://sc.ftqq.com/3.version)

**↑**登录，绑定微信关注公众号，然后[获取SCKEY](http://sc.ftqq.com/?c=code)，顺便可以在官网测试一下消息能否推送成功。

然后登录leancloud，在你的应用中部署代码：

<left><img src="https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201121132414665.png" alt="image-20201121132414665" style="zoom:66%;" />


值得注意的是：

<left><img src="https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201121132538439.png" alt="image-20201121132538439" style="zoom:50%;" />

代码如下，将token替换为自己的SCKEY：

```javascript
var http = require("request");
var obj = request.object;
console.log('收到一条新的评论：' + JSON.stringify(obj));
var title = "收到一条新的评论";
var url = request.object.get('url');
var nick = obj.get('nick');
if (nick == 'Anonymous'){
      nick = '陌生人';
}
var comment = obj.get('comment');
var content = nick + "给你留言：\n\n" + comment + "\n\n详情请访问：\n\n" + url;
var options = { method: 'GET',
    url: 'https://sc.ftqq.com/<在这里输入你的token>.send',
    qs: { 
        text: title,
        desp: content
    },
    headers: { } 
};
http(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
```

最后点击部署即可。

## 8.添加表情包⭐

> https://blog.csdn.net/cungudafa/article/details/106218905
> https://www.jianshu.com/p/205aaa14dff3

我的表情包源(fork来的+自己添加了一点)：

> https://github.com/GAATTC0/Valine-Magic

### 法一：在Valine.ejs中手动添加

```
hexo\themes\hexo-theme-matery-master\layout\_partial\Valine.ejs
```

添加bilibiliemoji示例：

```javascript
new Valine({
        el: '#vcomments',
        appId: '<%- theme.valine.appId %>',
        appKey: '<%- theme.valine.appKey %>',
        notify: '<%- theme.valine.notify %>' === 'true',
        verify: '<%- theme.valine.verify %>' === 'true',
        visitor: '<%- theme.valine.visitor %>' === 'true',
        avatar: '<%- theme.valine.avatar %>',
		metaPlaceholder: {"nick":"你的QQ号","mail":"你的邮箱","link":"你的网站url"},
        pageSize: '<%- theme.valine.pageSize %>',
        lang: '<% if (config.language == "zh-CN") {  %>zh-cn<% } else { %>en<% } %>',
        placeholder: '<%= theme.valine.placeholder %>',
		master: '',
		friends: [""],
		enableQQ: true,
		// 设置Bilibili表情包地址
        emojiCDN: '//i0.hdslb.com/bfs/emote/', 
        // 表情title和图片映射
        emojiMaps: {
        "tv_doge": "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
        "tv_亲亲": "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
        "tv_偷笑": "bb690d4107620f1c15cff29509db529a73aee261.png",
        "tv_再见": "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
        "tv_冷漠": "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
        "tv_发怒": "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
        "tv_发财": "34db290afd2963723c6eb3c4560667db7253a21a.png",
        "tv_可爱": "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
        "tv_吐血": "09dd16a7aa59b77baa1155d47484409624470c77.png",
        "tv_呆": "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
        "tv_呕吐": "9f996894a39e282ccf5e66856af49483f81870f3.png",
        "tv_困": "241ee304e44c0af029adceb294399391e4737ef2.png",
        "tv_坏笑": "1f0b87f731a671079842116e0991c91c2c88645a.png",
        "tv_大佬": "093c1e2c490161aca397afc45573c877cdead616.png",
        "tv_大哭": "23269aeb35f99daee28dda129676f6e9ea87934f.png",
        "tv_委屈": "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
        "tv_害羞": "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
        "tv_尴尬": "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
        "tv_微笑": "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
        "tv_思考": "90cf159733e558137ed20aa04d09964436f618a1.png",
        "tv_惊吓": "0d15c7e2ee58e935adc6a7193ee042388adc22af.png",
        "tv_打脸": "56ab10b624063e966bfcb76ea5dc4794d87dfd47.png",
        "tv_抓狂": "fe31c08edad661d63762b04e17b8d5ae3c71a757.png",
        "tv_抠鼻": "c666f55e88d471e51bbd9fab9bb308110824a6eb.png",
        "tv_斜眼笑": "911f987aa8bc1bee12d52aafe62bc41ef4474e6c.png",
        "tv_无奈": "ea8ed89ee9878f2fece2dda0ea8a5dbfe21b5751.png",
        "tv_晕": "5443c22b4d07fb1907ccc610c8e6db254f2461b7.png",
        "tv_流汗": "cead1c351ab8d79e9f369605beb90148db0fbed3.png",
        "tv_流泪": "7e71cde7858f0cd50d74b0264aa26db612a8a167.png",
        "tv_流鼻血": "c32d39db2737f89b904ca32700d140a9241b0767.png",
        "tv_点赞": "f85c354995bd99e28fc76c869bfe42ba6438eff4.png",
        "tv_生气": "26702dcafdab5e8225b43ffd23c94ac1ff932654.png",
        "tv_生病": "8b0ec90e6b86771092a498c54f09fc94621c1900.png",
        "tv_疑问": "0793d949b18d7be716078349c202c15ff166f314.png",
        "tv_白眼": "c1d59f439e379ee50eef488bcb5e5378e5044ea4.png",
        "tv_皱眉": "72ccad6679fea0d14cce648b4d818e09b8ffea2d.png",
        "tv_目瞪口呆": "0b8cb81a68de5d5365212c99375e7ace3e7891b7.png",
        "tv_睡着": "8b196675b53af58264f383c50ad0945048290b33.png",
        "tv_笑哭": "1abc628f6d4f4caf9d0e7800878f4697abbc8273.png",
        "tv_腼腆": "89712c0d4af73e67f89e35cbc518420380a7f6f4.png",
        "tv_色": "61822c7e9aae5da76475e7892534545336b23a6f.png",
        "tv_调侃": "4bc022533ef31544ca0d72c12c808cf4a1cce3e3.png",
        "tv_调皮": "b9c41de8e82dd7a8515ae5e3cb63e898bf245186.png",
        "tv_鄙视": "6e72339f346a692a495b123174b49e4e8e781303.png",
        "tv_闭嘴": "c9e990da7f6e93975e25fd8b70e2e290aa4086ef.png",
        "tv_难过": "87f46748d3f142ebc6586ff58860d0e2fc8263ba.png",
        "tv_馋": "fc7e829b845c43c623c8b490ee3602b7f0e76a31.png",
        "tv_鬼脸": "0ffbbddf8a94d124ca2f54b360bbc04feb6bbfea.png",
        "tv_黑人问号": "45821a01f51bc867da9edbaa2e070410819a95b2.png",
        "tv_鼓掌": "1d21793f96ef4e6f48b23e53e3b9e42da833a0f6.png"
		}
    });
```

或者更好的：

```javascript
//jsdelivr永远滴神
emojiCDN: 'https://cdn.jsdelivr.net/gh/GAATTC0/ValineCDN@master/', 
// 表情title和图片映射
emojiMaps: {
"bilibilitv2": "bilibilitv/[tv_doge].png",
"bilibilitv3": "bilibilitv/[tv_亲亲].png",
"bilibilitv4": "bilibilitv/[tv_偷笑].png",
"bilibilitv5": "bilibilitv/[tv_再见].png",
"bilibilitv6": "bilibilitv/[tv_冷漠].png",
"bilibilitv7": "bilibilitv/[tv_发怒].png",
"bilibilitv8": "bilibilitv/[tv_发财].png",
"bilibilitv9": "bilibilitv/[tv_可爱].png",
"bilibilitv10": "bilibilitv/[tv_吐血].png",
"bilibilitv11": "bilibilitv/[tv_呆].png",
"bilibilitv12": "bilibilitv/[tv_呕吐].png",
"bilibilitv13": "bilibilitv/[tv_困].png",
"bilibilitv14": "bilibilitv/[tv_坏笑].png",
"bilibilitv15": "bilibilitv/[tv_大佬].png",
"bilibilitv16": "bilibilitv/[tv_大哭].png",
"bilibilitv17": "bilibilitv/[tv_委屈].png",
"bilibilitv18": "bilibilitv/[tv_害羞].png",
"bilibilitv19": "bilibilitv/[tv_尴尬].png",
"bilibilitv20": "bilibilitv/[tv_微笑].png",
"bilibilitv21": "bilibilitv/[tv_思考].png",
"bilibilitv22": "bilibilitv/[tv_惊吓].png",
"bilibilitv23": "bilibilitv/[tv_打脸].png",
"bilibilitv24": "bilibilitv/[tv_抓狂].png",
"bilibilitv25": "bilibilitv/[tv_抠鼻].png",
"bilibilitv26": "bilibilitv/[tv_斜眼笑].png",
"bilibilitv27": "bilibilitv/[tv_无奈].png",
"bilibilitv28": "bilibilitv/[tv_晕].png",
"bilibilitv29": "bilibilitv/[tv_流汗].png",
"bilibilitv30": "bilibilitv/[tv_流泪].png",
"bilibilitv31": "bilibilitv/[tv_流鼻血].png",
"bilibilitv32": "bilibilitv/[tv_点赞].png",
"bilibilitv33": "bilibilitv/[tv_生气].png",
"bilibilitv34": "bilibilitv/[tv_生病].png",
"bilibilitv35": "bilibilitv/[tv_疑问].png",
"bilibilitv36": "bilibilitv/[tv_白眼].png",
"bilibilitv37": "bilibilitv/[tv_皱眉].png",
"bilibilitv38": "bilibilitv/[tv_目瞪口呆].png",
"bilibilitv39": "bilibilitv/[tv_睡着].png",
"bilibilitv40": "bilibilitv/[tv_笑哭].png",
"bilibilitv41": "bilibilitv/[tv_腼腆].png",
"bilibilitv42": "bilibilitv/[tv_色].png",
"bilibilitv43": "bilibilitv/[tv_调侃].png",
"bilibilitv44": "bilibilitv/[tv_调皮].png",
"bilibilitv45": "bilibilitv/[tv_鄙视].png",
"bilibilitv46": "bilibilitv/[tv_闭嘴].png",
"bilibilitv47": "bilibilitv/[tv_难过].png",
"bilibilitv48": "bilibilitv/[tv_馋].png",
"bilibilitv49": "bilibilitv/[tv_鬼脸].png",
"bilibilitv50": "bilibilitv/[tv_黑人问号].png",
"bilibilitv51": "bilibilitv/[tv_鼓掌].png",
}
```



### 法二：在js中添加

看链接吧233，虽然我还没看，不过第一种方法还能用hhh

<hr>
**更新：**

## 9.MiniValine

​	才发现matery竟然自带了另一个那就是MiniValine，只需要在主题配置中打开即可，配置相当简单而且不需要改源码，支持表情包分类拓展，真好用~

<hr>
### 10.表情过大的适配方式

在valine.ejs文件中删掉`max-width：100%`属性:

```dir
hexo\themes\hexo-theme-matery-master\layout\_partial\valine.ejs
```

```css
#vcomments img {
        /*max-width: 100%;*/
        height: auto;
        cursor: pointer;
}
```

再增加一个内边距0属性(虽然不知道有什么用)：

```css
.v[data-class=v] .vinput {
     padding: 0px 0px;
}
```



<hr>

# 重要更新：valine-admin的使用⭐⭐⭐

## 1.部署和配置

官方文档：https://github.com/DesertsP/Valine-Admin

参考官方文档即可完成配置

这里注意的是如果不是自定义云引擎域名而是用leancloud提供的`xxx.avosapps.us`的话，需要使用国际版。和国内账号不通用，但是可以在导入导出选项里将数据库迁移到国际版。

## 2.邮件模板

MAIL_TEMPLATE：

```html
<div style="border-radius: 10px 10px 10px 10px;font-size:13px;    color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);"><div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"><p style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #ffffff;" href="${SITE_URL}"> ${SITE_NAME}</a>上的留言有新回复啦！</p></div><div style="margin:40px auto;width:90%"><p>${PARENT_NICK} 同学，您曾在文章上发表评论：</p><div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">${PARENT_COMMENT}</div><p>${NICK} 给您的回复如下：</p><div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}#comments">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb"                href="${SITE_URL}"> ${SITE_NAME}</a>。</p><style type="text/css">a:link{text-decoration:none}a:visited{text-decoration:none}a:hover{text-decoration:none}a:active{text-decoration:none}</style></div><div style="width:100%;background:#49BDAD;color:#ffffff;border-radius:  0 0 10px 10px;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg,rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"></div></div>
```

MAIL_TEMPLATE_ADMIN：

```html
<div style="border-radius: 10px 10px 10px 10px;font-size:13px;    color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);"><div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"><p style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #ffffff;" href="${SITE_URL}"> ${SITE_NAME}</a>上的文章有了新的评论！</p></div><div style="margin:40px auto;width:90%"><p><strong>${NICK}</strong> 同学，发表评论说：</p><div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">${COMMENT}</div><p>您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}#comments">查看回复的完整內容</a>。</p><style type="text/css">a:link{text-decoration:none}a:visited{text-decoration:none}a:hover{text-decoration:none}a:active{text-decoration:none}</style></div><div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 0 0 10px 10px ;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg,rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"></div></div>
```

## 3.定时唤醒任务

> cron表达式采用的是UTC-0时间。

~~定时访问唤醒的Cron表达式可以写成：(已失效)~~

```cron
0 */30 7-23 * * ?
```

补发邮件可以写成：

```cron
0 0 23 * * ?
```

这个唤醒方法由于leancloud限流被禁止了，以下是新方法：

https://www.antmoe.com/posts/ff6aef7b/

我使用的是UptimeRobot定时访问valine-admin后台，配合每日检查补发函数可以覆盖大多数时间且不会长时间遗漏。