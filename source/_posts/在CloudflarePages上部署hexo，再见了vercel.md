---
title: 在CloudflarePages上部署hexo，再见了vercel
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
abbrlink: a037197e
date: 2021-05-14 18:39:21
img: https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/20210514211104.png
---

# 在CloudflarePages上部署hexo，再见了vercel

> 刚把网站搬到vercel上，几天后vercel就被墙了ORZ
>
> 希望cloudflare依然坚挺

## 1.注册CloudFlare

[传送门](https://pages.cloudflare.com)

## 2.常规操作：静态文件上传到github

不用多说了，参考部署到vercel的[第二步](https://gaattc.top/posts/ee92e53c)

## 3.关联github账号

同样的操作，见vercel部署

## 4.创建项目

选择`创建项目`：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210514184620061.png)

选择仓库，即第二步的仓库，选择`开始设置`。

选择项目名称和生产分支，然后构建设置这里无需操作：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210514184838962.png)

选择`保存并部署`。

## 5.自定义域名

直接设置域名会提示：添加到您的 Pages 项目之前，您需要将 DNS 转移到 Cloudflare。

需要将dns服务器设为cloud flare的。

## 6.DNS转移到cloudflare

参考https://blog.csdn.net/weixin_43153854/article/details/109779984

比如我是腾讯云的域名，有两个NS记录如下：

```url
goddard.dnspod.net.
heptagon.dnspod.net.
```

将其改为：

```url
elliott.ns.cloudflare.com
wren.ns.cloudflare.com
```

然后比较慢，等等等~

> 注册机构可能需要 24 小时来处理名称服务器更新。当您的站点在 Cloudflare 上激活时，您会收到一封电子邮件。

## 6.更新：腾讯云域名更改dns服务器

改NS记录是不行的，难怪等了几天还没变化，实际上要在控制台改：

①进入[腾讯云控制台](https://console.cloud.tencent.com/domain)

②找到你要更改的域名

③在`更多`中选择`修改DNS`即可

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210522111700260.png)

国内网络环境下生效还是挺快的，不需要等待72小时。