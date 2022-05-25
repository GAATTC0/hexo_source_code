---
title: java8特性之Predicate&Stream
categories:
  - 学习
  - java
tags:
  - java
img: 'https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/wallhaven-pkw6y3.jpg'
abbrlink: b6aaffba
date: 2021-07-23 14:54:13
---

# java8特性之Predicate&Stream

## 1.java.util.function.Predicate

接口源码：

```java
@FunctionalInterface
public interface Predicate<T> {
    /**
     * 具体过滤操作 需要被子类实现.
     * 用来处理参数T是否满足要求,可以理解为 条件A
     */
    boolean test(T t);
    /**
     * 调用当前Predicate的test方法之后再去调用other的test方法,相当于进行两次判断
     * 可理解为 条件A && 条件B
     */
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
    /**
     * 对当前判断进行"!"操作,即取非操作，可理解为 ! 条件A
     */
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }
    /**
     * 对当前判断进行"||"操作,即取或操作,可以理解为 条件A ||条件B
     */
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    /**
     * 对当前操作进行"="操作,即取等操作,可以理解为 A == B
     */
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

## 2.Predicate+lambda基本用法

①最简单的integer测试，设置条件为大于零，以下两个assert均通过：

```java
@Test
public void testWithLambda() {
    Predicate<Integer> predicate = i -> i > 0;
    Assert.assertFalse(predicate.test(-10));
    Assert.assertTrue(predicate.test(10));
}
```

②测试and()方法，增加条件小于5，以下两个assert均通过：

```java
@Test
public void testAnd() {
    Predicate<Integer> predicate = i -> i > 0;
    predicate = predicate.and(i -> i < 5);
    Assert.assertFalse(predicate.test(10));
    Assert.assertTrue(predicate.test(3));
}
```

③测试or()方法，条件为小于零或可以被二整除，以下两个assert均通过：

```java
@Test
public void testOr() {
    Predicate<Integer> predicate = i -> i < 0;
    predicate = predicate.or(i -> i % 2 == 0);
    Assert.assertFalse(predicate.test(3));
    Assert.assertTrue(predicate.test(10));
}
```

④and()和or()的简化写法，将上面两个改变一下，达到同样的效果：

```java
@Test
public void testAndSimple() {
    Predicate<Integer> predicate = i -> i > 0
            && i < 5;
    Assert.assertFalse(predicate.test(10));
    Assert.assertTrue(predicate.test(3));
}
```

```java
@Test
public void testOrSimple() {
    Predicate<Integer> predicate = i -> i < 0
           || i % 2 == 0;
    Assert.assertFalse(predicate.test(3));
    Assert.assertTrue(predicate.test(10));
}
```

⑤negate()和isEqual()类似，其实也可以通过and、or实现，就不多赘述。

## 3.Predicate与Stream结合使用

定义一个User类：

<font color=red size=4>注意，需要重写equals()和hashCode()方法</font>

```java
@Data
@AllArgsConstructor
@ToString
public class User {
    
    private String name;
    private Integer age;
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User user = (User) obj;
            if (name.equals(user.name)){
                return true;
            }
        }
            return false;
     }
    
     @Override
     public int hashCode () {
         return name.hashCode();
     }
}
```

写半个测试方法：

```java
@Test
public void testStream() {
    User a = new User("a", 10);
    User b = new User("b", 20);
    User c = new User("c", 30);
    ArrayList<User> users = Lists.newArrayList(a, b, c);
    user.stream.
}
```

可以发现有很多stream的方法可以以Predicate作为参数：

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20210723162117832.png)

为了方便起见，把users这个list的定义放在测试类中了。

下面演示具体的方法使用：

①用filter()方法筛选user中User的age小于25的：

```java
@Test
public void testStreamFilter() {
    List<User> list = users.stream().filter(u -> u.getAge() < 25).collect(Collectors.toList());
    Assert.assertEquals(2, list.size());
}
```

②其他方法：

```java
@Test
public void testStreamMatch() {
    // anyMatch：有任意一个与predicate符合的元素即为true
    Assert.assertTrue(users.stream().anyMatch(u -> "a".equals(u.getName())));
    Assert.assertFalse(users.stream().anyMatch(u -> "d".equals(u.getName())));

    // allMatch：全部与predicate符合的元素才为true
    Assert.assertTrue(users.stream().allMatch(u -> u.getAge() > 0));
    Assert.assertFalse(users.stream().allMatch(u -> u.getAge() > 10));

    // noneMatch：没有与predicate符合的元素才为true
    Assert.assertTrue(users.stream().noneMatch(u -> u.getAge() < 0));
    Assert.assertFalse(users.stream().noneMatch(u -> u.getAge() < 30));
}
```

(以上的lambda也可以替换为predicate对象，结合第二章来实现更详细和复杂的操作)