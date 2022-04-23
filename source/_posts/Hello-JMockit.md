---
title: Hello_JMockit
categories:
  - 学习
  - java
tags:
  - 学习心得
  - jmockit
img: >-
  https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210714092448487.png
abbrlink: 5b9abc
date: 2021-07-14 09:19:43
---

# Hello JMockit

## 1.Mock介绍

### 什么是mock

mock的字面意思是"模拟的，仿制的",在测试中是指对于某些`不容易获取的对象`或`不容易执行的过程`，用一个虚拟的对象或过程来作为替代品使测试程序得以正常运行。

### 为什么要mock

因为单元测试当中，我们只关注被测的单元，而不关心其他的依赖内容；有时需要屏蔽掉外部的依赖；有时也需要伪造一些方法体或者异常来进行测试。大致的使用场景有：

- 被调用的方法缺少运行环境
- 被调用的方法还未开发完成
- 真实的对象难以创建
- 真实的对象具有不确定的行为或特定的行为很难被触发
- 需要构造一些特殊情况如异常
- ...

### 为什么使用JMockit

常见的java开源Mock框架有Mockito、JMock与JMockit等，JMockit可以看作对JMock做了进一步的封装，更加方便好用。

并且支持常用的test框架如junit和testng。

jmockit允许直接在“真实”（非模拟）类上模拟方法和构造方法，无需在测试中实例化模拟对象并将它们传递给被测代码。这种模拟方法不仅适用于`public`实例方法，还适用于`final`和`static` 方法以及`构造方法`。

### JMockit的基本原理

 Java进行Mock的原理就是在加载并允许字节码的过程中对原方法的字节码做了掉包，虚拟机实际运行的是虚拟方法的字节码。

### "三步走"测试结构

经典的测试模型都是分成三个阶段:  **Arrange、Act、Assert (AAA)**：

1. Arrange阶段:数据或者依赖的服务的准备和注入;
2. Act阶段:目的测试执行;
3. Assert阶段:把执行完的测试结果和期望值进行比较。

Mock测试也分为三个阶段：**record、replay、verify**：

1、record(录制): mock方法并返回指定结果；
2、repaly(回放): 执行单元测试 case，原先在record阶段被录制的调用都可能被执行到(这里“可能”强调了并不是录制了就一定会严格执行)；
3、verify: 检查mock方法使用情况。

## 2.开始使用

> 本文均使用junit+jmockit为例

### 配置Maven依赖

```xml
<dependencies>
   <dependency>
      <groupId>org.jmockit</groupId>
      <artifactId>jmockit</artifactId>
      <version>${jmockit.version}</version>
      <scope>test</scope>
   </dependency>
</dependencies>
```

<font color=#f78022>注意：jmockit依赖需要在junit之后添加</font>

JMockit 还需要使用`-javaagent` JVM 初始化参数：

```xml
<plugins>
   <plugin>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>2.22.2</version> <!-- or some other version -->
      <configuration>
         <argLine>
            -javaagent:"${settings.localRepository}"/org/jmockit/jmockit/${jmockit.version}/jmockit-${jmockit.version}.jar
         </argLine>
      </configuration>
   </plugin>
</plugins>
```

也可以在 IntelliJ IDEA 或 Eclipse 的“运行/调试配置”中指定 `-javaagent:<proper path>/jmockit.1.x.jar`。

## 3.Mocking

先定义一个App类和一个hello方法 ：

```java
public class App {

    public String hello(String str) {
        return "hello " + str;
    }
    
    public String hello_1(String str) {
        return "hello " + str;
    }

    public static String staticHello(String str) {
        return "hello " + str;
    }
}
```

### 几个注解@Mocked、@Tested、@Injectable和@Capturing

`@Mocked`，mock整个对象，自动实例化对象，对象的方法（包括静态方法）均返回默认值（在使用它的测试期间）；

`@Tested`，修饰类，表示是我们要测试对象,如果该对象没有赋值，JMockit会去实例化它。通常和@Injectable搭配使用；

`@Injectable`, 只影响被加上注解的当前实例，并且不影响静态方法；

`@Capturing`，它将模拟扩展到实现模拟接口的类，或扩展模拟类的子类。

### 三个代码块

每个测试单元的结构可以与上面提到的测试三步走结构对应：**record、replay、verify**。

示例如下：

```java
public class AppTest {

    @Mocked
    App app;

    @Test
    public void testMockedAnnotation() {
        // record
        new Expectations() {{
            app.hello("1");
            result = "hello mock";
        }};

        // replay
        System.out.println(app.hello("1"));

        // verify
        new Verifications() {{
            app.hello("1");
            times = 1;
        }};
    }
}
```

> 结果是"hello mock"

**Expectations**代码块中写需要模拟的方法以及自定义返回值，在一个Expectations中可以同时录制多个行为，也可以分开多个Expectations录制。

**Verifications**代码块中写被调用的方法以及期望被调用的次数。(如果实际被调用的次数与写的不一致将报错)

### 两种模拟方式(整体&局部)

**①引用@Mocked/@Injectable对象，实现类的整体模拟：**

```java
public class AppTest {

    @Mocked
    App app;

    @Test
    public void testMockedAnnotation() {
        new Expectations() {{
            app.hello("1");
            result = "hello mock";
        }};

        System.out.println(app.hello("1"));
        System.out.println(App.staticHello("1"));
    }
}
```

> 结果是：
> hello mock
> null

```java
public class AppTest {

    @Injectable
    App app;
    App app_1 = new App();

    @Test
    public void testInjectableAnnotation() {
        new Expectations() {{
            app.hello("1");
            result = "hello mock";
        }};

        System.out.println(app.hello("1"));
        System.out.println(app.hello_1("1"));
        System.out.println(app_1.hello("1"));
        System.out.println(app_1.hello_1("1"));
    }
}
```

> 结果是：
> hello mock
> null
> hello 1
> hello 1

**②在Expectations中传入类的class对象作为参数，实现部分方法的模拟：**

```java
public class AppTest {

    @Test
    public void testExpectationsParam() {

        App app = new App();

        new Expectations(App.class) {{
            app.hello("1");
            result = "hello mock";
        }};

        System.out.println(app.hello("1"));
        System.out.println(App.staticHello("1"));
    }
}
```

> 结果是：
> hello mock
> hello 1

**③在Expectations中传入实例对象作为参数，实现部分方法的模拟**

```java
@Test
public void testPartialMock() {
    App app = new App();
    new Expectations(app) {{
        app.hello(anyString);
        result = "hello000 ";
    }};
    System.out.println(app.hello("1"));
    System.out.println(app.hello_1("1"));
}
```

> 结果是：
>
> hello000 
> hello 1

**④将测试类中的对象加上@Tested和@Mocked两个注解，来实现部分方法的模拟**

```java
public class AppTest {

    @Tested
    @Mocked
    App app;
    
    @Test
    public void testAnotherWayPartialMock() {
        new Expectations() {{
            app.hello(anyString);
            result = "hello2333 ";
        }};
        System.out.println(app.hello("1"));
        System.out.println(app.hello_1("1"));
    }
}
```

> 结果是：
>
> hello2333 
> hello 1

### Injectable作用于参数对象示例

可以给参数对象自定义值(这个方法支持原始数据类型和数组类型)：

```java
public class AppTest {

    @Test
    public void testInjectableParam(@Injectable("injectable") String s) {
        System.out.println(App.staticHello(s));
    }
}
```

> 结果是：
>
> hello injectable

### 参数值的灵活匹配

①"any"字段

JMockit提供了一整套完整的any类型，可以用以匹配任何原始类型（和相应的包装类）、字符串、通用类型Object，下面以String为例：

```java
public class AppTest {

    @Mocked
    App app;

    @Test
    public void testAny() {
        new Expectations() {{
            app.hello(anyString);
            result = "hello mock";
        }};

        System.out.println(app.hello("1"));

        new Verifications() {{
            app.hello(anyString);
            times = 1;
        }};
    }
}
```

> 【补充】any字段的万能用法：强转。可以匹配任何已有类型。
>
> ```java
> new Expectations() {{
>      app.hello((String) any);
>      result = "hello mock";
>      app.hello((App) any);
>      result = "hello mock";
> }};
> ```

②"with"字段

在记录或验证代码块中，`withXxx(...)`可以对参数的任何子集调用方法：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210714152627843.png)

下面以withSubstring()为例：

```java
public class AppTest {

    @Mocked
    App app;

    @Test
    public void testWith() {
        new Expectations() {{
            app.hello(withSubstring("1"));
            result = "hello mock";
        }};

        System.out.println(app.hello("111"));

        new Verifications() {{
            app.hello(withSubstring("1"));
            times = 1;
        }};
    }
}
```

> 结果是：
>
> hello mock

### 多种情况返回不同结果

通过在Expectations中定义result = new Delegate(){}，其中定义与被mock的方法参数和返回值相同的任意名称方法，内部逻辑可以自定来达到根据参数返回结果的效果。例如：

```java
    @Test
    public void testDelegate() {
        new Expectations(App.class) {{
            app.hello(anyString);
            result = new Delegate() {
                String anyMethodName(String str) {
                    if (str.length() < 3) {
                        return "hello short";
                    } else {
                        return "hello long";
                    }
                }
            };
        }};
```

> 结果是：
>
> hello short
> hello long

### 调用计数约束

times，minTimes，和 maxTimes。值可以为任何非负整数。

用于Expectations代码块中，相应方法的后面。如果调用次数低于或高于预期下限或上限，或与指定次数不相等，则测试失败。

例如：

```java
@Test
    public void testTimes() {
        new Expectations() {{
            app.hello("1");
            result = "hello mock";
            minTimes = 2;
            app.hello_1(anyString);
            times = 1;
        }};

        System.out.println(app.hello("1"));
        System.out.println(app.hello("1"));
        System.out.println(app.hello_1("abc"));
    }
```

### 其他

<font color=#dd001b size =5>更多功能待更新。。。</font>

## 4.Faking

> 基于状态的方法，既方便又好用。
>

### ⭐通过new MockUp\<T\>对象

通过`MockUp<T>`类和`@Mock`注解来伪造类和方法，这个方法可以自定义方法体，并且未覆盖的方法不受影响，其中构造方法特殊使用$init作为方法名。

<font color=#dd001b>注意：@Mock的方法前可以不用加修饰词，如public、static等，保证方法签名和要覆盖的一致就可以了</font>

例如：

```java
public class AppTest {

    @Test
    public void testMockUp() {
        new MockUp<App>() {

            @Mock
            public void $init () {
                System.out.println("init");
            }

            @Mock
            String hello(String str) {
                return "abc";
            }
        };

        System.out.println(new App().hello("1"));
        System.out.println(App.staticHello("1"));
    }
}
```

> 结果是：
> init
> abc
> hello 1

### 通过继承MockUp\<T\>类

这种方法创造的mock对象，没有覆盖的方法就会访问不到，比如下面这个会访问不了hello_1方法：

```java
class AppMocker extends MockUp<App> {

    @Mock
    public String hello(String str) {
        return "helloMock " + str;
    }
}
```

```java
@Test
public void testMocker() {
    AppMocker appMocker = new AppMocker();
    System.out.println(appMocker.hello("1"));
}
```

> 结果是：
>
> helloMock 1

## 5.一些特殊的情况和用法

### 通过new MockUp\<T\>对象覆盖方法的复用

将覆盖的定义写在@Before中即可，整个测试类都可以使用修改的方法，但是注意的是它的作用范围：

`@Before中定义`--->`@After执行结束`期间都生效。

（或者是@BeforeClass和@AfterClass）

### Mock时调用原方法

在待Mock的方法的参数列表中加入invocation参数，通过invocation.procee()调用原方法。

```java
@Test
public void testProceed() {
     new MockUp<App>() {
        @Mock
        String hello(Invocation invocation, String str) {
            return invocation.proceed("123");
         }
     };
     System.out.println(new App().hello("1"));
}
```

> 结果是：
>
> hello 123

### Mock修改私有方法/静态方法

在App中定义以下两个方法：

```java
private String privateHello(String str) {
    return "private " + str;
}

public String publicHello(String str) {
    return privateHello(str);
}
```

①通过继承MockUp\<T\>   <font color=red>同样适用与静态方法</font>

```java
class AppMocker extends MockUp<App> {

    @Mock
    public String publicHello(String str) {
        return privateHello(str);
    }

    @Mock
    // 修改private方法的方法体
    private String privateHello(String str) {
        return "mockedPrivate " + str;
    }
}
```

```java
@Test
public void testMockPrivate() {
    AppMocker appMocker = new AppMocker();
    System.out.println(appMocker.publicHello("1"));
}
```

> 结果是：
>
> mockedPrivate 1

②通过new MockUp\<T\>对象   <font color=red>同样适用与静态方法</font>

```java
@Test
public void testPrivate() {
    new MockUp<App>() {
        @Mock
        String privateHello(String str) {
            return "mockedPrivate " + str;
        }
    };
    System.out.println(new App().publicHello("1"));
}
```

> 结果是：
>
> mockedPrivate 1

③在Expectations中录制私有方法

<font color=red size=8>不行！</font>

### 其他

<font color=#dd001b size =5>更多功能待更新。。。(如果有</font><font size =1>~~时间~~</font><font color=#dd001b size =5>的话)</font>



<hr>



本文参考链接：

> [JMockit官方文档](http://jmockit.github.io/tutorial)
>
> [JMockit中文网](http://www.jmockit.cn/)
>
> [csdn原创：Jmockit使用详解之Mocking](https://blog.csdn.net/guanhang89/article/details/78703945)
>
> [百度文库：JMockit中文版入门指南](https://wenku.baidu.com/view/15cb5965dd3383c4ba4cd270.html)
>
> [简书：Jmockit（一）： 入门](https://www.jianshu.com/p/b859f59d2634)
>
> [知乎：一文带你玩转JMockit](https://zhuanlan.zhihu.com/p/106117486)
>
> 以及一些其他的资料...



