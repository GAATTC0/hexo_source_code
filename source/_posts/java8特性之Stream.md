---
title: java8特性之Stream
categories:
  - 学习
  - java
tags:
  - java
img: 'https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/wallhaven-g75r7d.jpg'
abbrlink: 1e79e935
date: 2021-07-28 09:56:09
---

# java8特性之stream

> Stream 是用函数式编程方式在集合类上进行复杂操作的工具，其集成了Java 8中的众多新特性之一的聚合操作，开发者可以更容易地使用Lambda表达式，并且更方便地实现对集合的查找、遍历、过滤以及常见计算等操作。

## 1.Stream的方法

可以分为三类：

1. 创建Stream:通过stream()方法，取得集合对象的数据集。
2. Intermediate:通过一系列中间（Intermediate）方法，对数据集进行过滤、检索等数据集的再次处理。
3. Terminal通过最终（terminal）方法完成对数据集中元素的处理。

> 在一次聚合操作中，可以有多个Intermediate，但是有且只有一个Terminal。在对一个Stream可以进行多次转换操作，并不是每次都对Stream的每个元素执行转换。并不像for循环中，循环N次，其时间复杂度就是N。转换操作是lazy(惰性求值)的，只有在Terminal操作执行时，才会一次性执行。可以这么认为，Stream 里有个操作函数的集合，每次转换操作就是把转换函数放入这个集合中，在 Terminal 操作的时候循环 Stream 对应的集合，然后对每个元素执行所有的函数。

本文将按照以下三大类进行总结`Intermediate`、`Terminal`和`Short-circuiting`：

- Intermediate：map (mapToInt, flatMap 等)、 filter、 distinct、 sorted、 peek、 skip、 parallel、 sequential、 unordered
- Terminal：forEach、 forEachOrdered、 toArray、 reduce、 collect、 min、 max、 count、iterator
- Short-circuiting：anyMatch、 allMatch、 noneMatch、 findFirst、 findAny、 limit

## 2.Stream的创建方法

### 1.Stream.of(T... values)和Stream.of(T t)

获得的Stream长度有限且为传入的元素个数.例如：

```java
Stream<String> stream = Stream.of("1","2","3");
```

### 2.Stream.generate(Supplier\<T\> s)

返回一个无限长度的Stream,其元素由Supplier接口的提供。在Supplier是一个函数接口，只封装了一个get()方法,需要配合终止方法使用.例如：

```java
Stream<Double> stream = Stream.generate(Math::random);
```

### 3.Stream.iterate(T seed, UnaryOperator\<T\> f)

同样是无限长度的，传入的第一个参数为种子seed，也是stream中的第一个元素，第二个元素是由第一个元素通过迭代函数f产生，然后第三个由第二个产生，以此类推，例如：

```java
Stream<Integer> stream = Stream.iterate(2, n -> 2 * n);
stream.limit(10).forEach(System.out::print);
```

结果是：2 4 8 16 32 64 128 256 512 1024

### 4.Stream.empty()

empty方法返回一个空的顺序Stream

### 5.集合获取Stream的方法

在Collection接口中，定义了一个默认方法stream()用来获取集合对象的stream，例如：

```java
ArrayList<String> list = new ArrayList<>();
Stream<String> stream = list.stream();
```

### 6.数组获取Stream的方法

利用Arrays类的静态方法Arrays.stream(T[] array)，还提供了除对象泛型以外的基本类型的重载方法，例如：

```java
int[] ints = new int[]{1, 2, 3};
IntStream stream = Arrays.stream(ints);
```

### 7.其他方法

- Random.ints()
- BitSet.stream()
- Pattern.splitAsStream(java.lang.CharSequence)
- JarFile.stream()

## 3.Intermediate

> 本质上是将源Stream转换为一个新的Stream

### 1.concat(Stream<? extends T> a, Stream<? extends T> b)

Stream的静态方法concat，将两个Stream连接在一起，合成一个Stream。若两个输入的Stream都时排序的，则新Stream也是排序的；若输入的Stream中任何一个是并行的，则新的Stream也是并行的；若关闭新的Stream时，原两个输入的Stream都将执行关闭处理。

```java
Stream<Integer> stream1 = Stream.of(1, 2);
Stream<Integer> stream2 = Stream.of(3, 4);
System.out.println(Stream.concat(stream1, stream2).count());
```

结果是：4

### 2.distinct()

根据元素的equals和hashcode方法去重

```java
Stream.of(1, 2, 3, 1, 4, 2, 5).distinct().forEach(System.out::print);
```

结果是：12345

### 3.filter(Predicate<? super T> predicate)

根据传入的predicate参数进行过滤，参考[jdk8特性之Predicate-stream](http://gaattc.top/posts/b6aaffba/)

### 4.map(Function<? super T, ? extends R> mapper)

可以根据传入的lambda表达式将元素转换为任意类型和数值，并提供了几个方便的方法mapToDouble，mapToInt，mapToLong

```java
Stream.of("a", "b", "c").map(String::toUpperCase).forEach(System.out::print);
```

结果是：ABC

### 5.flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)

返回一个流，该流由通过将提供的映射函数应用于每个元素而生成的映射流的内容替换此流的每个元素的结果组成。 每个映射流在其内容放入该流后关闭，如果映射流为null ，则使用空流代替。Function的返回值需要是一个Stream。

同样提供了几个方便的方法flatMapToInt，flatMapToLong和flatMapToDouble

```java
Stream.of("a", "b", "c").flatMap(s -> Stream.of(s.toUpperCase())).forEach(System.out::println);
```

结果是：ABC

### 6.peek(Consumer<? super T> action)

生成一个包含原Stream的所有元素的新Stream，传入一个消费函数（Consumer实例），新Stream每个元素被消费的时候都会**优先**执行给定的消费函数，例如：

```java
Stream.of("a", "b", "c").peek(System.out::print).map(String::toUpperCase).forEach(System.out::print);
```

结果是：aAbBcC

> 注意：peek方法主要是用来对流的元素进行非干扰操作的，即调试打印之类，最好不要对元素进行修改等干扰操作。

### 7.skip(long n)

跳过Stream中的前N个元素，返回剩下的元素所组成的新Stream，如果元素个数≤n，则返回一个空stream

```java
Stream.of("a", "b", "c").skip(2).forEach(System.out::println);
```

结果是：c

### 8.sorted()和sorted(Comparator<? super T> comparator)

对stream中元素进行排序，若没有传入comparator则按自然顺序(natural order)

例如：

```java
Stream.of("111", "1", "11").sorted().forEach(System.out::println);
Stream.of("111", "1", "11").sorted(Comparator.comparingInt(String::length)).forEach(System.out::println);
```

结果都是：1 11 111

## Terminal

### 1.collect(Collector<? super T, A, R> collector)

传入一个收集器，将stream中的元素收集到集合或其他结果中。
①可以利用Collectors提供的静态方法转成集合：

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210728134512331.png)

例如：

```java
List<Integer> list = Stream.of(1, 2, 3).collect(Collectors.toList());
TreeSet<Integer> treeSet = Stream.of(1, 2, 3).collect(Collectors.toCollection(TreeSet::new));
ArrayList<Integer> arrayList = Stream.of(1, 2, 3).collect(Collectors.toCollection(ArrayList::new));
Map<Integer, byte[]> map = Stream.of("1", "11", "111").collect(Collectors.toMap(String::length, String::getBytes));
```

②可以利用Collectors提供的静态方法转成特定值：

`averagingDouble`:求平均值，Stream的元素类型为double
`averagingInt`:求平均值，Stream的元素类型为int
`averagingLong`:求平均值，Stream的元素类型为long
`counting`:Stream的元素个数
`maxBy`:在指定条件下的，Stream的最大元素
`minBy`:在指定条件下的，Stream的最小元素
`reducing`: reduce操作
`summarizingDouble`:统计Stream的数据(double)状态，其中包括count，min，max，sum和平均。
`summarizingInt`:统计Stream的数据(int)状态，其中包括count，min，max，sum和平均。
`summarizingLong`:统计Stream的数据(long)状态，其中包括count，min，max，sum和平均。
`summingDouble`:求和，Stream的元素类型为double
`summingInt`:求和，Stream的元素类型为int
`summingLong`:求和，Stream的元素类型为long

例如：

```java
Optional<Integer> collect = Stream.of(1, 2, 3).collect(Collectors.maxBy(Integer::compare));
Double avg = Stream.of(1, 2, 3).collect(Collectors.averagingInt(Integer::intValue));
Long count = Stream.of(1, 2, 3).collect(Collectors.counting());
IntSummaryStatistics statistics = Stream.of(1, 2, 3).collect(Collectors.summarizingInt(Integer::intValue));
Integer sum = Stream.of(1, 2, 3).collect(Collectors.summingInt(Integer::intValue));
```

③可以利用Collectors提供的静态方法将stream分割和分组：

groupingBy()和partitioningBy()方法，用法很相似，返回值类型也都是map，但是区别是后者只能根据条件分为两组true与false，而前者可以根据条件分为很多组，例如：

```java
Map<Boolean, List<Integer>> partitioning = Stream.of(1, 2, 3).collect(Collectors.partitioningBy(n -> n > 1));
Map<Integer, List<Integer>> grouping = Stream.of(1, 2, 3).collect(Collectors.groupingBy(Object::hashCode));
System.out.println(partitioning);
System.out.println(grouping);
```

结果是：
{false=[1], true=[2, 3]}
{1=[1], 2=[2], 3=[3]}

④可以利用Collectors提供的静态方法将字符串合并并格式化：

可以选择性加入分隔符以及前缀后缀，例如：

```java
String collect = Stream.of("1", "2", "3").collect(Collectors.joining("-", "<", ">"));
String collect1 = Stream.of("1", "2", "3").collect(Collectors.joining("-"));
String collect2 = Stream.of("1", "2", "3").collect(Collectors.joining());
System.out.println(collect);
System.out.println(collect1);
System.out.println(collect2);
```

结果是：
<1-2-3>
1-2-3
123

### 2.count()

返回stream中元素的个数，例如：

```java
System.out.println(Stream.of(1, 2, 3).count());
```

结果是：3

### 3. forEach(Consumer<? super T> action)和 forEachOrdered(Consumer<? super T> action)

对stream中元素进行遍历，区别是后者的执行顺序一定是按照插入的顺序的。

例如：

```java
Stream.of(1, 2, 3).forEach(System.out::print);
```

结果是：123

### 4.max()和min()

根据传入的比较器寻找stream中的最值，返回类型为Optional,例如:

```java
Optional<Integer> max = Stream.of(1, 3, 2).max(Comparator.comparingInt(a -> a));
Optional<Integer> min = Stream.of(1, 3, 2).min(Comparator.comparingInt(a -> a));
System.out.print(max.get());
System.out.print(min.get());
```

结果是：31

### 5.reduce()

介绍reduce方法的两个重载：

- Optional\<T\> reduce(BinaryOperator\<T\> accumulator);
- T reduce(T identity, BinaryOperator\<T\> accumulator);

第一种：参数为一个累加器accumulator，返回类型为Optional。其需要用到两个参数进行计算，第一次计算的第一个参数为stream的第一个元素，第二个参数为stream的第二个元素，此后，累加器的计算结果为第一个参数，stream中的下一个元素为第二个参数，迭代计算直到stream元素耗尽。

第二种：参数为一个对象identity和一个累加器accumulator，返回类型为第一个参数的类型。与第一种重载不同的是，它的第一次计算的第一个参数为identity，第二个参数为stream的第一个参数，后续与第一种重载相同。特殊地，当stream为空时，直接返回identity。

例如：

```java
Optional<Integer> reduce = Stream.of(1, 2, 3).reduce(Integer::sum);
Integer reduce1 = Stream.of(1, 2, 3).reduce(1, Integer::sum);
System.out.print(reduce.get());
System.out.print(reduce1);
```

结果是：67

## Short-circuiting

### 1.anyMatch、 allMatch、 noneMatch

参考[jdk8特性之Predicate-stream](http://gaattc.top/posts/b6aaffba/)

### 2. findAny()和findFirst()

findAny()返回包含stream中任一元素的Optional，特殊地，空stream会返回一个空的Optional，非并行调用默认返回第一个元素的Optional
findFirst()返回stream中的第一个元素，特殊地，空stream会返回一个空的Optional，如果stream没有排序，返回任意一个元素的Optional

例如：

```java
Optional<Integer> any = Stream.of(1, 2, 3).findAny();
Optional<Integer> first = Stream.of(1, 2, 3).findFirst();
Optional<Object> empty = Stream.empty().findAny();
System.out.print(any.get());
System.out.print(first.get());
System.out.print(empty.isPresent());
```

结果是：11false

### 3. limit(long maxSize)

如果原Stream的元素个数大于maxSize，将截取原Stream的前maxSize个元素；如果原Stream的元素个数小于或等于maxSize，将截取原Stream中的所有元素。

返回值仍是stream。例如：

```java
Stream.of(1, 2, 3).limit(2).forEach(System.out::print);
Stream.of(1, 2, 3).limit(5).forEach(System.out::print);
```

结果是：12123