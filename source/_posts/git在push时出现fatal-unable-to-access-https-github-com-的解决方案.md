---
title: 'git在push时出现”fatal: unable to access ''https://github.com/...“的解决方案'
categories:
  - bug
  - git
tags:
  - bug
img: '/img/111git.jpg'
abbrlink: 8135c12a
date: 2021-05-10 14:15:34
---

# git在push时出现”fatal: unable to access' https://github.com/...'“的解决方案

> 出现这种问题有许多种情况，根据不同错误提示选择不同解决方式

![](/img/image-20210513191817547.png)

## 1.OpenSSL SSL_read: Connection was aborted, errno 10053

这种情况可能是因为ssh安全验证问题导致的，解决方法：

打开git bash，执行以下命令。

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

其中邮箱如果忘记可以通过以下 命令查看。

```bash
git config --global -l
```

生成的ssh文件默认位置是：

```dir
C:\Users\username\.ssh
```

找到`id_rsa.pub`文件，使用记事本或文本编辑器打开，然后复制内容。

打开github，在设置里找到并添加SSH key即可.

![](/img/image-20210510143241801.png)



<hr>

这个问题也可以通过第二种问题的方式解决。



## 2.SSL cerificate problem: self signed certificate

这种SSL证书问题，可以通过禁用证书验证解决

```bash
git config --global http.sslVerify "false"
```

## 3.Filename too long

文件名或路径过长，解决方式：

```bash
git config --global core.longpaths true
```

## 4.Timeout

一般是网络问题，测试一下与服务器的连接。

## 5.其他

还有可能是文件过大导致的，修改缓冲大小为500M：

```bash
git config http.postBuffer 524288000
```

## 6.附赠之warning: LF will be replaced by CRLF in xxx.
The file will have its original line endings in your working directory.

这个问题禁用自动转换即可：

```bash
git config --global core.autocrlf false
```



<hr>

## <font color=red>7.更新ssh协议解决https网络问题</font>

> 最近发现push经常失败，原因可能是github.com的dns污染，虽然可以手动测速换host，但是太麻烦而且时断时续的，解决：
>
> **网页端访问github.com**：安装《github加速》插件，完美解决；
>
> **命令行操作**：换ssh协议push就没问题了

首先执行上面的方法1，生成并配置ssh key，

确保没有禁用ssl证书，如果禁用，执行方法2，其中false改为true即可，

git bash下验证是否配置成功：

```bash
ssh -T git@github.com
```

显示"Hi \<yourname\>! You've successfully authenticated, but GitHub does not provide shell access."即代表成功。

最后，在根目录配置中修改仓库地址为ssh协议即可：

![](/img/image-20210516121448458.png)

