---
title: java8特性之Optional
categories:
  - 学习
  - java
tags:
  - java
img: 'https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/wallhaven-x8z9yo.jpg'
abbrlink: d5c1462e
date: 2021-07-28 16:59:07
---

java8特性之Optional

> Optional类主要是为了解决空指针异常，不需要在代码中显示地进行判空等

## 1.Optional的创建

Optional类提供了三种静态方法：

### 1.empty()

创建一个空的Optional：

```java
Optional<Object> empty = Optional.empty();
```

### 2.of()

为非null的值创建一个Optional,特殊地，参数为null时会抛出NullPointerException:

```java
Optional<String> optional = Optional.of("1");
// 将造成空指针异常
Optional<Object> exception = Optional.of(null);
```

### 3.ofNullable()

创建一个可为null的Optional:

```java
// 将返回一个empty的Optional对象
Optional<Object> optional = Optional.ofNullable(null);
```

## 2.Optional的判空

isPresent()方法，optional有值则返回true，为空则返回false：

```java
Optional<String> optional = Optional.of("1");
Optional<Object> optional1 = Optional.ofNullable(null);
System.out.println(optional.isPresent());
System.out.println(optional1.isPresent());
```

结果是：true false

## 3.Optional的转换

### 1.filter(Predicate<? super T> predicate)

传入一个predicate条件，如果原optional的值为空或者满足predicate条件，则返回原optional，非空且不满足predicate则返回空optional，例如：

```java
Optional<String> o = Optional.ofNullable((String) null).filter(s -> s.length() > 2);
Optional<String> o1 = Optional.of("1").filter(s -> s.length() > 2);
Optional<String> o2 = Optional.of("111").filter(s -> s.length() > 2);
System.out.println(o);
System.out.println(o1);
System.out.println(o2);
```

结果是：
Optional.empty
Optional.empty
Optional[111]

### 2. map(Function<? super T, ? extends U> mapper)

传入一个操作函数，若原optional为空，则直接返回一个空optional，否则返回一个Optional.ofNullable(mapper.apply(value))，即对值进行操作之后的新optional并且允许为空：

```java
System.out.println(Optional.empty().map(a -> a));
System.out.println(Optional.of(1).map(a -> a + 1));
System.out.println(Optional.of(1).map(a -> null));
```

结果是：
Optional.empty
Optional[2]
Optional.empty

### 3.flatMap(Function<? super T, Optional\<U\>> mapper)

与map的区别是flatMap的参数mapper的返回值必须是optional，例如：

```java
System.out.println(Optional.of(1).flatMap(a -> Optional.of(a + 1)));
```

结果是：Optional[2]

### 4.ifPresent(Consumer<? super T> consumer)

传入一个Consumer参数，如果值存在，则执行之，无返回值，例如:

```java
Optional.of(1).ifPresent(System.out::println);
Optional.empty().ifPresent(System.out::println);
```

结果是：1

## 4.Optional值的获取

### 1.get()

如果optional有值则返回值，为空则抛出NoSuchElementException

```java
Integer i = Optional.of(1).get();
// 此方法将抛出异常
Object exception = Optional.empty().get();
```

### 2.orElse(T other)

如果optional有值则返回值，为空则返回传入的参数，例如：

```java
System.out.print(Optional.of(1).orElse(2));
System.out.print(Optional.empty().orElse(2));
```

结果是：12

### 3.orElseGet(Supplier<? extends T> other)

与orElse的区别是传入的参数为一个Supplier接口的实现来生成一个值，例如：

```java
System.out.print(Optional.of(1.0).orElseGet(Math::random));
System.out.print(Optional.empty().orElseGet(Math::random));
```

结果是:1.0 0.832628831775226(随机数)

### 4.orElseThrow(Supplier<? extends X> exceptionSupplier)

如果optional有值则返回值，为空则抛出异常

```java
System.out.print(Optional.of(1).orElseThrow(RuntimeException::new));
// 此方法将抛出异常
System.out.print(Optional.empty().orElseThrow(RuntimeException::new));
```

