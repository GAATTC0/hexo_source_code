---
title: 在Vercel上部署hexo，再见了gitee
abbrlink: ee92e53c
date: 2021-05-09 22:01:27
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: /img/image-20210509231549298.png
---

# 在Vercel上部署hexo，再见了gitee

> 由于gitee的pages服务维护三个月，三个月后不知道会不会又出来些收费限流之类的，所以决定迁移到vercel了~

## 1.注册vercel

直接使用github关联注册就可以了，很方便并且推荐用这种方式。

## 2.上传部署目录到github仓库

这一步不用多说，如果是之前就使用github的pages服务那就更方便了。不过还是写一下吧😅

①建一个公共仓库(~~好像也可以是私有的？~~)

②修改**根目录**下的_config.yml配置文件中deploy项：

![](/img/image-20210509221039752.png)

repo改成仓库地址，注意一下分支是master还是main哦。

③在根目录的`package.json`文件添加脚本，很重要，否则部署后404

```json
{
  "scripts": {
    "build": "hexo generate"
  }
}
```

![](/img/image-20210509221424840.png)

④执行三连

```bash
hexo cl
hexo g
hexo d
```

push成功的话就好了。

## 3.进入vercel控制台进行部署

在dashboard中选择`new project`,

![](/img/image-20210509221614721.png)

选择`Import Git Repository`，再选择关联自己的github账号并授权，这里直接授权所有仓库即可；

等读取到仓库列表后选择hexo所在仓库，选择`import`；

选择Select Vercel Scope这里使用下面的`PERSONAL ACCOUNT`然后`select`；

目录默认就是根目录root，直接下一步即可；

最后可以修改项目名，框架可以不用管，然后选择`deploy`即可部署完成。

![](/img/image-20210509222022160.png)

## 4.自定义域名

> [参考链接](https://snow.js.org/hexo-vercel/)

①点击项目卡片进入详情

②选择`view domains`

③可以使用vercel提供的二级域名，直接添加即可(前提是没被占用)

![](/img/image-20210509222852367.png)

格式有两种：

```url
xxx.now.sh
xxx.vercel.app
```

<font color=red>④添加自定义域名</font>

在输入框中输入域名，点击右侧 `Add `，下方会提示“Invalid Config”，然后根据情况：

- 如果是根域名，请在你的 DNS 解析处添加 A 记录，指向 `76.76.21.21`

- 如果是子域名，请在你的 DNS 解析处添加 CNAME 记录，指向 `cname.vercel-dns.com`

添加记录后等待片刻再刷新，下面显示两个蓝色对号即表明验证成功。