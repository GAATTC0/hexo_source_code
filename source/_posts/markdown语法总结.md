---
title: markdown语法总结
categories:
  - 学习
  - markdown
tags:
  - markdown
img: >-
  /img/iconfinder_markdown_298823.png
abbrlink: 5417bea
date: 2020-12-09 14:20:10
update: 2021-1-17 12:13:43
top: true
---

# markdown语法总结

## 1.基本语法

### 1.标题

使用 `#号+空格`可表示 1-6 级标题。

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 2.换行

①使用`两个空格+回车`换行

②使用`<br>`标签换行

③使用一个空行表示一个新的段落

### 3.字体变化

斜体：

```markdown
*斜体文本*
_斜体文本_
```
粗体：

```markdown
**粗体文本**
__粗体文本__
```
粗斜体：

```markdown
***粗斜体文本***
___粗斜体文本___
```

删除体：

```markdown
~~删除体文本~~
```

下划线：

```markdown
<u>下划线</u>
```

小代码片：

```markdown
`代码`
```

注释：

```markdown
<!--注释-->
```

### 4.分隔线

可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```markdown
<hr>

***

* * *

*****

- - -

----------
```

### 5.脚注

创建脚注格式：

 [^演示]
[^演示]: 我是脚注

```markdown
 [^演示]
[^演示]: 我是脚注
```

### 6.无序列表

无序列表使用`星号(*)、加号(+)或减号(-)` + `空格` 来表示,如：

```markdown
- 第一项
- 第二项
- 第三项
```

### 7.有序列表

有序列表使用`数字`+` . `来表示，如：

```markdown
1. 第一项
2. 第二项
3. 第三项
```

### 8.列表嵌套

在子列表中的选项前面添加四个空格即可。

```markdown
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

### 9.引用块

`>`+`空格`：

```markdown
> 111
> 222
```

> 111
> 222

嵌套引用块：

```markdown
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

> 最外层
> > 第一层嵌套
> >
> > > 第二层嵌套

也可以和有序/无序列表搭配使用。

### 10.代码块

①` ``` `包裹起来：

~~~markdown
```java
public static void main(String args[]){
	System.out.print("HelloMarkdown");
}
```
~~~

②前面加四个空格或一个tab

### 11.链接

```markdown
[链接名称](链接地址)
或
<链接地址>
```

也可以类似脚注的写法：

```markdown
[GAATTC][123]
[123]: https://gaattc.gitee.io
```

### 12.图片

类似链接，前面加一个感叹号

```markdown
![alt](http://#)
或
![alt](http://# "title")
```

也可以类似脚注写法。

也可以使用html写法：

```
<img src="http://#" width="50%">
```

### 13.表格

使用 `|` 来分隔不同的单元格，使用 `-` 来分隔表头和其他行。

表格的对齐方式：

- **-:** 设置内容和标题栏居右对齐。
- **:-** 设置内容和标题栏居左对齐。
- **:-:** 设置内容和标题栏居中对齐。

```markdown
| 左对齐 | 右对齐 | 居中对齐|
| :-----| ----: | :----:|
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

## 2.高级用法

### 1.文字大小变

```html
<font size=4>我是变大的字</font>
<small>字体变小</small>
<big>字体变大</big>
```

<font size=4>我是变大的字</font>
<small>字体变小</small>
<big>字体变大</big>

### 2.文字颜色和字体标签

可以使用font标签：

```html
<font color=red face=Consolas>文字</font>
```

<font color=red face="Consolas">文字</font>

### 3.其他支持的标签：

```html
<kbd> <b> <i> <em> <sup> <sub>等
```

### 4.转义字符

如果需要显示特定的符号则需要使用转义字符，可以使用反斜杠转义特殊字符：

```
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

### 5.数学公式(需要mathjax)

可以使用两个美元符 $$ 包裹 TeX 或 LaTeX 格式的数学公式来实现：

```markdown
$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
${$tep1}{\style{visibility:hidden}{(x+1)(x+1)}}
$$
```

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
${$tep1}{\style{visibility:hidden}{(x+1)(x+1)}}
$$

### 6.流程图

[参考](https://www.jianshu.com/p/b421cc723da5)

### 7.嵌入iframe

> 可以嵌入很多扩展网页或者插件

比如b站视频：

![](/img/image-20210117122139210.png)

```html
<iframe src="//player.bilibili.com/player.html?aid=543638785&bvid=BV1ui4y1c7Zm&cid=281537346&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```

<font color="red">注意：嵌入视频最好指定高度宽度，如：</font>

```html
width="800" height="450"
```

比如网易云：

<img src="/img/image-20210117121723072.png" style="zoom:67%;" />

```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=28283406&auto=1&height=66"></iframe>
```

修改音乐id即可。

### 8.折叠块

语法：

```markdown
<details>
  <summary>折叠代码块</summary>
  <pre><code> 
     System.out.println("我是代码");
  <code></pre>
</details>
```

效果：

<details>
  <summary>折叠代码块</summary>
  <pre><code> 
     System.out.println("我是代码");
  </code></pre>
</details>