---
title: sql查询语法总结
categories:
  - 学习
  - 数据库
tags:
  - sql
img: https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/ac6eddc451da81cb037c289d5366d016082431c3.jpg
abbrlink: 23d9d6c0
date: 2020-12-04 11:10:45
---

# sql查询语法总结

mybatis用到很多基础都忘了，复习一下...

> 环境：mysql5.7

## 1.SELECT语句的执行顺序

(6) SELECT column_name, ... 
(1) FROM table_name, ...
(2) [WHERE ...] 
(3) [GROUP BY ...] 
(4) [HAVING ...] 
(5) [ORDER BY ...]; 
(7) LIMIT
即：

> 1.关键字的顺序
>    SELECT...FROM...WHERE...GROUP BY...HAVING...ORDER BY...LIMIT;
> 2.底层执行的顺序
>    FROM > WHERE > GROUP BY > HAVING > SELECT字段 > DISCTINCT > ORDER BY > LIMIT;

## 2.简单查询

[演示用数据准备1](https://gaattc.lanzoui.com/ii65ej1cz1i)

### 计算表达式和函数的值

```sql
select 2 * 3;
select now();
select concat('a','b','c','d');
select sqrt(9);
```

### 查询表中的字段

```sql
select name from heros;
select name,hp_max,mp_max,role_main from heros;
select * from heros;
```

### 使用 WHERE 子句过滤记录（where）

```sql
# 查询主要角色定位为'法师'的英雄有哪些?
select name,role_main from heros where role_main='法师';
```

### 给字段起别名（as）

```sql
select name, hp_max as hp, mp_max as mp from heros;
select name, hp_max hp, mp_max mp from heros;
```

AS 关键字可以省略，但是不推荐这样做。 AS 关键字不仅仅可以给字段起别名，还可以给表起别名。

### 去除重复行（distinct）

```sql
# 查询主要角色定义有哪些？ 
# select role_main from heros;
select distinct role_main from heros;
# 查询不同的主要角色定位和辅助角色定位。 
select distinct role_main, role_assist from heros;
```
注意：
a.DISTINCT 是对所有查询字段的组合进行去重，也就是说每个字段都相同，才认为两条记录是相同的。
b. DISTINCT 关键字必须放在所有查询字段的前面.

### 排序（order by）

```sql
select name,hp_max from heros order by hp_max; # 升序
select name,hp_max from heros order by hp_max asc; # 升序
select name,hp_max from heros order by hp_max desc; # 降序 
# 按照多个字段排序 
select name,hp_max,mp_max from heros order by hp_max, mp_max;
select name,hp_max,mp_max from heros order by hp_max, mp_max desc;
select name,hp_max,mp_max from heros order by hp_max asc, mp_max desc;
# 对非选择字段进行排序 
select name,hp_max from heros order by hp_max asc, mp_max desc;
# 对计算字段排序 
select name,hp_max,mp_max from heros order by (hp_max + mp_max);
```

### 限制结果集的数量

语法：①LIMIT offset, nums;      ② LIMIT nums OFFSET offset;

```sql
# 练习：我们想查询最大生命值最高的5名英雄。
select name, hp_max from heros order by hp_max desc limit 0, 5;
select name, hp_max from heros order by hp_max desc limit 5 offset 0;
# 当偏移量为0时,我们可以省略offset
select name, hp_max from heros order by hp_max desc limit 5;
# 分页查询(page, rows)
# limit rows offset (page-1)*rows
```

**注意：**

不同的 DBMS 用来限制结果集的关键字是不一样的，比如Microsoft SQL Server 和 Access  使用的是 TOP 关键字。 
offset是指偏移量，从第1行查起，偏移量自然为0。此时，可以写成 LIMIT n;
可以使用 LIMIT 关键字实现分页查询。 LIMIT (page_num – 1) * page_size, page_size;

### 计算字段

```sql
select name, hp_max + mp_max from heros;
select name, hp_max + mp_max as total from heros;
```

### 聚合函数

```sql
count(), sum(), avg(), max(), min()
```

```sql
# COUNT(*) 计算表中的总行数; 
create table t_count(
    a int,
    b int
);
insert into t_count values (null, null), (1, null),(null, 2),(3, 3);
select * from t_count;
select count(*) as nums from t_count;
# COUNT() 作用于某个具体的字段，可以统计这个字段的非 `NULL` 值的个数。
select count(a) from t_count;
```

以下均忽略null值的行  ：

sum()

```sql
select sum(hp_max) from heros;
select sum(distinct hp_max) from heros;
```

avg()

```sql
select avg(hp_max) from heros;
select round(avg(hp_max), 2) as avg from heros;  #指定小数点后多少位
```

max()，min()

```sql
select max(hp_max) from heros;
select min(hp_max) from heros;
```

### 分组

 a.搭配聚合函数使用

```sql
# 练习：按照主要角色定位进行分组，并统计每一组的英雄数目。
select role_main, count(*) from heros group by role_main;
# 练习：按照次要角色定位进行分组，并统计每一组的英雄数目。
select role_assist, count(*) from heros group by role_assist;
```

b.group_concat

```sql
# 练习：我们想查询每种角色的英雄都有哪些？
select role_main, group_concat(name) from heros group by role_main;
```

![](https://cdn.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/snipaste_2020-07-02_22-42-08.png)

c.多字段分组

```sql
select count(*) as num, role_main, role_assist from heros 
group by role_main, role_assist 
order by num desc;
```

 d. having过滤分组

```sql
# 练习：我们想要按照英雄的主要角色定位，次要角色定位进行分组，
# 并且筛选分组中英雄数目大于 5 的组，最后根据每组的英雄数目从高到低进行排序。
SELECT COUNT(*) AS num, role_main, role_assist 
FROM heros 
GROUP BY role_main, role_assist 
HAVING num > 5
ORDER BY num DESC;
# 练习：筛选最大生命值大于 6000 的英雄，按照主要角色定位，次要角色定位分组，
# 并且筛选英雄数目大于 5 的分组，最后按照英雄数目从高到低进行排序。
SELECT COUNT(*) AS num, role_main, role_assist 
FROM heros 
WHERE hp_max > 6000
GROUP BY role_main, role_assist 
HAVING num > 5
ORDER BY num DESC;
```

### 时间(datetime)相关

①时间转换

```sql
#时间之间转换
year(date)
month(date)
day(date)，to_days(date)
hour(date)
minute(date)
second(date),time_to_sec(time)
#字符串与时间转换
date_format(date,format)
time_format(time,format)
str_to_date(str,format)
#时间转字符串
strftime(format,time)
#%d 日期, 01-31、%f 小数形式的秒，SS.SSS、%H 小时, 00-23、%j 算出某一天是该年的第几天，001-366、%m 月份，00-12、
%M 分钟, 00-59、%s 从1970年1月1日到现在的秒数、%S 秒, 00-59、%w 星期, 0-6 (0是星期天)、%W 算出某一天属于该年的第几周, 01-53、%Y 年, YYYY、%% 百分号
```

②获取当前时间

```sql
#获得当前日期+时间（date + time）
now()
sysdate()
#获得当前时间戳
current_timestamp
current_timestamp()
```

不同之处在于：now() 在执行开始时值就得到了， sysdate() 在函数执行时动态得到值

③时间计算

```sql
#加减法
date_add()
date_sub()
#算差值
datediff(date1,date2)
timediff(time1,time2)
#加减法
date_add()
date_sub()
#算差值
datediff(date1,date2)
```

④timestamp的函数

```sql
timestamp(date) # date to timestamp
timestamp(dt,time) # dt + time
timestampadd(unit,interval,datetime_expr)
timestampdiff(unit,datetime_expr1,datetime_expr2)
```

⑤时区（timezone）转换函数

```sql
convert_tz(dt,from_tz,to_tz)
```

### 小数类型转换

```sql
#取整
round(num,n) #num是小数，n为取小数点后位数
```

## 3.复杂查询

[演示用数据准备2](https://gaattc.lanzoui.com/ifjqnj1l5yf)

### 1 .交叉连接

交叉连接也叫笛卡尔乘积

```sql
select * from player cross join team;
select * from player,team;
```

### 2 .等值连接

等值连接就是对多张表中相同的字段进行等值判断

**自然连接**

```sql
SELECT player_id, team_id, player_name, height, team_name FROM player NATURAL JOIN team;
```

**USING 连接**

```
SELECT player_id, team_id, player_name, height, team_name FROM player JOIN team USING(team_id);
```

**ON 连接**

```sql
SELECT player_id, player.team_id, player_name, height, team_name FROM player JOIN team ON player.team_id = team.team_id;
```

### 3.非等值连接

连接两张表的条件如果是相等判断，那就是等值连接，否则就是非等值连接。
比如说，查询每个球员的身高级别：

```sql
SELECT player_name, height, height_level FROM player JOIN height_grades AS h ON player.height BETWEEN h.height_lowest AND h.height_highest;
```

### 4.外连接

外连接除了查询满足条件的记录以外，还可以查询某一方不满足条件的记录。两张表做外连接，会有一张表是主表，另一张表是从表。

**左外连接**
左外连接，就是左边的表是主表，需要显示左边表的全部行。右边表是从表，只显示满足条件的行。关键字为 LEFT OUTER JOIN 。

```sql
select girls.gid, gname, bname from girls left join boys on girls.bid = boys.bid;
```

**右外连接**
右外连接，就是右边的表是主表，需要显示右边表的全部行。左边表是从表，只显示满足条件的行。关键字为 RIGHT OUTER JOIN 。

```sql
select boys.bid, bname, gname from girls right join boys using (gid);
```

**全外连接**
两张表都是主表，都需要显示全部行。但是MySQL不支持全外连接。关键字为 FULL OUTER JOIN 。

### 5.自连接

对同一张表进行连接

比如我们想要查看比布雷克-格里芬高的球员都有谁：

```sql
SELECT b.player_name, b.height FROM player as a JOIN player as b ON a.player_name = '布雷克-格里芬' and a.height < b.height;
```

## 4.联合查询

可以用 `UNION` 关键字，将多个结果集合并成一个结果集，这样的查询我们叫联合查询。
应用场景： 要查询的结果来自多个表，且多个表没有直接的连接关系，但查询的信息一致时。
**注意事项:** a. 列数一致 b. 对应的数据最好一致 c. UNION会去重, `UNION ALL`不会去重。

## 5.子查询

子查询可以分为`关联子查询`和`非关联子查询`。

①如果子查询只执行一次，然后子查询的结果集会作为外部查询的条件进行判断，那么这样的子查询叫做**非关联子查询**
比如：我们想要查询哪个球员的身高最高，最高身高是多少？

```sql
SELECT player_name, height FROM player WHERE height = (SELECT max(height) FROM player);
```

②如果子查询依赖于外部查询，通常情况下是因为子查询用到了外部查询的某些字段。因此，每执行一次外部查询，子查询都要重新执行一次，这样的子查询叫做**关联子查询**。
比如：我们想要查询每个球队中大于平均身高的球员有哪些，并显示球员姓名，身高以及所在球队 ID。

```sql
SELECT player_name, height, team_id FROM player AS a WHERE height > (
SELECT AVG(height) FROM player AS b WHERE a.team_id = b.team_id
);
```

### 1. EXISTS 子查询

关联子查询可能会搭配 `EXISTS` 关键字一起使用。 `EXISTS` 用来判断子查询的结果集是否为空集。如果不为空集返回 True ，如果为空集返回 False 。
eg:查询出过场的球员都有哪些，并显示他们的球员ID，球员姓名，球队ID。

```sql
select player_id, player_name, team_id
from player
where exists (
select player_id from player_score where player_score.player_id =
player.player_id
);
```

同理，`NOT EXISTS` 自然就是不存在的意思。

### 2.集合比较子查询

集合比较子查询的作用是与外部查询的结果集进行比较。主要有以下几个关键字：IN, SOME (ANY),
ALL。他们的含义如下：

| 关键字    | 含义                                                       |
| :-------- | ---------------------------------------------------------- |
| IN        | 判断是否在子查询的结果集中                                 |
| SOME(ANY) | 需要与比较操作符一起使用，与子查询结果集中的某个值进行比较 |
| ALL       | 需要与比较操作符一起使用，与子查询结果集中的所有值进行比较 |

还是上面那个例子：查询出过场的球员都有哪些，并显示他们的球员ID，球员姓名，球队ID。我们可以
采用 `IN `来进行操作：

```sql
select player_id, player_name, team_id
from player
where player_id in (
select distinct player_id from player_score
)
```

`SOME` 和 `ALL` 都需要和比较操作符一起使用，这些比较操作符包括： > , = , < , >= , <= , 和 <> 。

eg：我们要查询比印第安纳步行者 (team_id=1002) 中某个球员身高高的球员有哪些，显示它们的球员ID，球员姓名和球员身高。

```sql
select player_id, player_name, height
from player
where height > some(
select height from player where team_id = 1002
);
```

同样，如果我们想查询比印第安纳步行者 (team_id=1002) 中所有球员身高都高的球员有哪些，显示它们的球员ID，球员姓名和球员身高。

```sql
select player_id, player_name, height
from player
where height > all(
select height from player where team_id = 1002
);
```

### 3.子查询作为计算字段

子查询甚至可以作为计算字段存在。举个例子：查询每个球队的名称，和它们的球员数。

```sql
select team_name, (select count(*) from player where player.team_id = team.team_id) AS player_num from team;
```

通常会给这个计算字段起个别名表达更明确。