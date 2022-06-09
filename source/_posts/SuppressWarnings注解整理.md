---
title: SuppressWarnings注解
categories:
  - 学习
  - java
tags:
  - java
abbrlink: b932b521
date: 2022-06-07 15:50:32
---

# @SuppressWarnings注解整理

## 1.@SuppressWarnings注解

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

是jdk提供的注解之一，作用是屏蔽一些无关紧要的警告。使开发者能看到一些他们真正关心的警告，从而提高开发者的效率。指示应该在注释元素（以及包含在该注释元素中的所有程序元素）中取消显示指定的编译器警告。注意，在给定元素中取消显示的警告集是所有包含元素中取消显示的警告的超集。例如，如果注释一个类来取消显示某个警告，同时注释一个方法来取消显示另一个警告，那么将在此方法中同时取消显示这两个警告。 
根据风格不同，程序员应该始终在最里层的嵌套元素上使用此注释，在那里使用才有效。如果要在特定的方法中取消显示某个警告，则应该注释该方法而不是注释它的类。 

“各编译器供应商应该将它们所支持的警告名连同注释类型一起记录。鼓励各供应商之间相互合作，确保在多个编译器中使用相同的名称。”
尽管官方建议编译器厂商使用相同的名称，但是实际还是有所不同，下面均以IDEA为例。

## 2.用法

### (1)单个value注解

可用于类、字段、方法、参数、构造方法、局部变量。

```java
@SuppressWarnings("val")
@SuppressWarnings(value = "val")
@SuppressWarnings(value = {"val"})
@SuppressWarnings({"val"})
```

### (2)多个value注解

可用于类、字段、方法、参数、构造方法、局部变量。

```java
@SuppressWarnings(value = {"val1", "val2"})
@SuppressWarnings({"val1", "val2"})
```

### (3)单行注释形式

一般用于单行或者代码片段的警告抑制，作用范围较小时使用。(注意这里//后不加空格，否则会有Redundant suppression警告)

```java
//noinspection val
```

## 3.常用value值及其含义

| 关键字                             | 用途                                               |
| :--------------------------------- | :------------------------------------------------- |
| all                                | 抑制所有警告                                       |
| boxing                             | 抑制装箱、拆箱操作时候的警告                       |
| cast                               | 抑制映射相关的警告                                 |
| dep-ann                            | 抑制启用注释的警告                                 |
| deprecation                        | 抑制过期方法警告                                   |
| fallthrough                        | 抑制确在switch中缺失breaks的警告                   |
| finally                            | 抑制finally模块没有返回的警告                      |
| hiding                             | 抑制相对于隐藏变量的局部变量的警告                 |
| incomplete-switch                  | 忽略没有完整的switch语句                           |
| nls                                | 忽略非nls格式的字符                                |
| null                               | 忽略对null的操作                                   |
| rawtypes                           | 使用generics时忽略没有指定相应的类型               |
| restriction                        | 抑制禁止使用劝阻或禁止引用的警告                   |
| serial                             | 忽略在serializable类中没有声明serialVersionUID变量 |
| static-access                      | 抑制不正确的静态访问方式警告                       |
| synthetic-access                   | 抑制子类没有按最优方法访问内部类的警告             |
| unchecked                          | 抑制没有进行类型检查操作的警告                     |
| unqualified-field-access           | 抑制没有权限访问的域的警告                         |
| unused                             | 抑制没被使用过的代码的警告                         |
| UnusedReturnValue                  | 抑制返回值没有被使用的方法上的警告                 |
| ResultOfMethodCallIgnored          | 抑制调用有返回值的方法没有使用其返回值的警告       |
| Duplicates                         | 抑制重复代码警告                                   |
| DuplicatedCode                     | 抑制重复代码警告                                   |
| ConditionCoveredByFurtherCondition | 抑制非必要条件的警告                               |
| TestMethodWithIncorrectSignature   | 抑制测试方法签名不正确(带参)警告                   |
| SuspiciousMethodCalls              | 抑制可疑的方法调用的警告                           |
| Convert2Lambda                     | 抑制匿名内部类可以转为lambda的警告                 |
| Convert2MethodRef                  | 抑制lambda可以转为方法引用的警告                   |
| FieldCanBeLocal                    | 抑制成员变量可以改为局部变量的警告                 |
| ArraysAsListWithZeroOrOneArgument  | 抑制Arrays.asList()方法参数少于2个的警告           |
| RedundantSuppression               | 抑制冗余抑制的警告                                 |
| ...                                | ...                                                |

IDEA中所有检查的警告都有对应的抑制注解，不一一列举了，使用时可以在警告上使用alt+enter快捷添加注解。