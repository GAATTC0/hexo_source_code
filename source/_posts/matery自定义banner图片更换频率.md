---
title: matery自定义banner图片更换频率
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: 'https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/wallhaven-z8mq8y.jpg'
abbrlink: 289a5094
date: 2021-05-11 13:44:21
---

# matery自定义banner图片更换频率

> 主题默认是根据星期数一天一换的，但是随之而来存在一些问题：
>
> - 比如参与轮换的图片上限只能是7张，我想多放一些
> - 比如我想每小时一更换，亦或每分钟更换呢
>
> 让我们来自定义一下吧

## 1.首先找到静态资源的位置

在主题文件夹中的medias目录里,

```dir
hexo\themes\hexo-theme-matery-master\source\medias\banner
```

这里就是默认存放banner图的位置了。

## 2.再寻找更换图片的逻辑

找到`bg-cover-content.ejs`文件，

```dir
hexo\themes\hexo-theme-matery-master\layout\_partial\bg-cover-content.ejs
```

发现每日更换图片的代码：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210511135428447.png)

主要逻辑就是利用字符串拼接路径，其中图片名为`星期数+".jpg"`，

new Date().getTime()方法就是获取当前星期数。

## 3.开始修改

方便起见还是按照原本的逻辑，稍作修改达到我们的要求即可。

> 比如我想放10张图片，并且每分钟改变一次

首先是每分钟改变，则先获取 当前的分钟数：

```javascript
 new Date().getMinutes()
```

然后放10张图片并按顺序重命名好：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210511140633083.png)

最后，由于是10张，可以通过分钟数对10取余，得到余数作为文件名即可

```javascript
new Date().getMinutes() % 10
```

如此以来就达到目的了，

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210511135320576.png)

## 4.补充

在原本基础上小改的缺点就是，走不出原本的框架：

- 比如拼接文件名，最后是".jpg"，我们放的图片就必须是jpg格式

- 比如根据时间改变图片的逻辑，我们的图片命名必须是从0开始连续的数字

- 比如想要用随机数的方法，排除时间因素直接随机出来

这些问题要解决也不难，可以自己重写一下这部分~

## 5.附：js中Date对象的常用获取时间方法

[转](https://www.w3school.com.cn/jsref/jsref_obj_date.asp)

| [Date()](https://www.w3school.com.cn/jsref/jsref_Date.asp)   | 返回当日的日期和时间。                             |
| ------------------------------------------------------------ | -------------------------------------------------- |
| [getDate()](https://www.w3school.com.cn/jsref/jsref_getDate.asp) | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。        |
| [getDay()](https://www.w3school.com.cn/jsref/jsref_getDay.asp) | 从 Date 对象返回一周中的某一天 (0 ~ 6)。           |
| [getMonth()](https://www.w3school.com.cn/jsref/jsref_getMonth.asp) | 从 Date 对象返回月份 (0 ~ 11)。                    |
| [getFullYear()](https://www.w3school.com.cn/jsref/jsref_getFullYear.asp) | 从 Date 对象以四位数字返回年份。                   |
| [getYear()](https://www.w3school.com.cn/jsref/jsref_getYear.asp) | 请使用 getFullYear() 方法代替。                    |
| [getHours()](https://www.w3school.com.cn/jsref/jsref_getHours.asp) | 返回 Date 对象的小时 (0 ~ 23)。                    |
| [getMinutes()](https://www.w3school.com.cn/jsref/jsref_getMinutes.asp) | 返回 Date 对象的分钟 (0 ~ 59)。                    |
| [getSeconds()](https://www.w3school.com.cn/jsref/jsref_getSeconds.asp) | 返回 Date 对象的秒数 (0 ~ 59)。                    |
| [getMilliseconds()](https://www.w3school.com.cn/jsref/jsref_getMilliseconds.asp) | 返回 Date 对象的毫秒(0 ~ 999)。                    |
| [getTime()](https://www.w3school.com.cn/jsref/jsref_getTime.asp) | 返回 1970 年 1 月 1 日至今的毫秒数。               |
| [getTimezoneOffset()](https://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp) | 返回本地时间与格林威治标准时间 (GMT) 的分钟差。    |
| [getUTCDate()](https://www.w3school.com.cn/jsref/jsref_getUTCDate.asp) | 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。    |
| [getUTCDay()](https://www.w3school.com.cn/jsref/jsref_getUTCDay.asp) | 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。     |
| [getUTCMonth()](https://www.w3school.com.cn/jsref/jsref_getUTCMonth.asp) | 根据世界时从 Date 对象返回月份 (0 ~ 11)。          |
| [getUTCFullYear()](https://www.w3school.com.cn/jsref/jsref_getUTCFullYear.asp) | 根据世界时从 Date 对象返回四位数的年份。           |
| [getUTCHours()](https://www.w3school.com.cn/jsref/jsref_getUTCHours.asp) | 根据世界时返回 Date 对象的小时 (0 ~ 23)。          |
| [getUTCMinutes()](https://www.w3school.com.cn/jsref/jsref_getUTCMinutes.asp) | 根据世界时返回 Date 对象的分钟 (0 ~ 59)。          |
| [getUTCSeconds()](https://www.w3school.com.cn/jsref/jsref_getUTCSeconds.asp) | 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。          |
| [getUTCMilliseconds()](https://www.w3school.com.cn/jsref/jsref_getUTCMilliseconds.asp) | 根据世界时返回 Date 对象的毫秒(0 ~ 999)。          |
| [parse()](https://www.w3school.com.cn/jsref/jsref_parse.asp) | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。 |

## 6.(推荐⭐)我现在使用的：随机法

有几张图片都可以方便地适应，比如我还是那10张图，那么需要从0~9中产生随机数：

```javascript
Math.round(Math.random()*9)
```

ps：当然，不需要被原有的规则禁锢，图片名只要是连续数字，依然可以产生符合要求的随机数，详情参考js的`Math.random()`方法使用即可。

