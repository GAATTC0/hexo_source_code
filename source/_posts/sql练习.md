---
title: sql练习
categories:
  - 学习
  - 数据库
tags:
  - sql
img: /img/6658561_1592208013625_1111-1_%E7%94%BB%E6%9D%BF1%E5%89%AF%E6%9C%AC6.png
abbrlink: dd4b99ae
date: 2020-12-01 23:51:25
---

# SQL练习

> 几十道简单的sql练习题，冬日暖手必备

[数据准备](https://gaattc.lanzoui.com/iRmaxizqzhg)

## 1.单表查询

--查询订购日期在1996年7月1日至1996年7月15日之间的订单的订购日期、订单ID、客户ID和雇员ID等字段的值

<img src="/img/image-20201201225039555.png" alt="" style="zoom: 67%;" />
--查询供应商的ID、公司名称、地区、城市和电话字段的值。条件是“地区等于华北”并且“联系人头衔等于销售代表”。 

 ![](/img/image-20201201225442095.png)

--查询供应商的ID、公司名称、地区、城市和电话字段的值。其中的一些供应商位于华东或华南地区，另外一些供应商所在的城市是天津

 ![](/img/image-20201201225826327.png)

--查询位于“华东”或“华南”地区的供应商的ID、公司名称、地区、城市和电话字段的值

 ![](/img/image-20201201230047686.png)

 

```sql
#1
select 订购日期,订单ID,客户ID,雇员ID
from 订单
where 订购日期>'1996-7-1' and 订购日期<'1996-7-15';
#2
select 供应商ID,公司名称,地区,城市,电话
from 供应商
where 地区='华北' and 联系人职务='销售代表';
#3
select 供应商ID,公司名称,地区,城市,电话
from 供应商
where 地区='华东' or 地区='华南' or 城市='天津';
#4
select 供应商ID,公司名称,地区,城市,电话
from 供应商
where 地区='华东' or 地区='华南';
```



## 2.多表查询

--查询订购日期在1996年7月1日至1996年7月15日之间的订单的订购日期、订单ID、相应订单的客户公司名称、负责订单的雇员的姓氏和名字等字段的值，并将查询结果按雇员的“姓氏”和“名字”字段的升序排列，“姓氏”和“名字”值相同的记录按“订单 ID”的降序排列

 ![](/img/image-20201201231615488.png)

--查询“10248”和“10254”号订单的订单ID、运货商的公司名称、订单上所订购的产品的名称

 ![](/img/image-20201201233000266.png)

--查询“10248”和“10254”号订单的订单ID、订单上所订购的产品的名称、数量、单价和折扣

 ![](/img/image-20201201233446848.png)

--查询“10248”和“10254”号订单的订单ID、订单上所订购的产品的名称及其销售金额

 ![](/img/image-20201201234636085.png)

 

```sql
#5
select o.订购日期,o.订单ID,c.公司名称,e.姓氏,e.名字
from 订单 o 
left join 客户 c on o.客户ID=c.客户ID
left join 雇员 e on o.雇员ID=e.雇员ID
where o.订购日期>'1996-7-1' and o.订购日期<'1996-7-15'
order by e.姓氏,e.名字,o.订单ID desc;
#6
select o.订单ID,s.公司名称,p.`产品名称`
from 订单 o
left join 运货商 s on o.运货商=s.运货商ID
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
where o.`订单ID`='10248' or o.`订单ID`='10254';
#7
select o.订单ID,p.`产品名称`,d.`数量`,d.`单价`,d.`折扣`
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
where o.`订单ID`='10248' or o.`订单ID`='10254';
#8
select o.`订单ID`,p.`产品名称`,round(d.`单价`*d.`数量`*(1-d.`折扣`),2) as '销售金额'
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
where o.`订单ID`='10248' or o.`订单ID`='10254';
```

 

## 3.综合查询

--查询所有运货商的公司名称和电话

 ![](/img/image-20201202103928512.png)

--查询所有客户的公司名称、电话、传真、地址、联系人姓名和联系人头衔

 <img src="/img/image-20201202104301446.png" alt="" style="zoom:67%;" />

--查询单价介于10至30元的所有产品的产品ID、产品名称和库存量

 <img src="/img/image-20201202104531488.png" alt="" style="zoom:67%;" />

--查询单价大于20元的所有产品的产品名称、单价以及供应商的公司名称、电话

 <img src="/img/image-20201202104957296.png" alt="" style="zoom:50%;" />

--查询上海和北京的客户在1996年订购的所有订单的订单ID、所订购的产品名称和数量

 <img src="/img/image-20201202110005483.png" alt="" style="zoom: 67%;" />

--查询华北客户的每份订单的订单ID、产品名称和销售金额

 <img src="/img/image-20201202110723614.png" alt="" style="zoom:67%;" />

--按运货商公司名称，统计1997年由各个运货商承运的订单的总数量

 ![](/img/image-20201202114136297.png)

--统计1997年上半年的每份订单上所订购的产品的总数量

 <img src="/img/image-20201202144646845.png" style="zoom:67%;" />

--统计各类产品的平均价格

 ![](/img/image-20201202145300093.png)

--统计各地区客户的总数量

 ![](/img/image-20201202145620186.png)

```sql
#9
select 公司名称,电话
from 运货商;
#10
select 公司名称,电话,传真,联系人姓名,联系人职务
from 客户;
#11
select 产品ID,产品名称,库存量
from 产品
where 单价>10 and 单价<30;
#12
select p.产品名称,p.单价,s.`公司名称` as 供应商公司名称,s.`电话` as 供应商电话
from 产品 p
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
where p.`单价`>20;
#13
select o.订单ID,p.产品名称,d.数量
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
where o.`货主城市` in ('北京','上海') and year(o.`订购日期`)=1996;
#14
select o.`订单ID`,p.`产品名称`,round(d.`单价`*d.`数量`*(1-d.`折扣`),2) as 销售金额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
where o.`货主地区`='华北';
#15
select t.`公司名称`,count(*) as 总订单数
from 订单 o
left join 运货商 t on o.`运货商`=t.`运货商ID`
where year(o.`订购日期`)=1997
group by t.`公司名称`;
#16
select o.`订单ID`,sum(d.`数量`) as 产品总数量
from 订单 o 
left join 订单明细 d on o.`订单ID`=d.`订单ID`
where year(o.`订购日期`)=1997 and month(o.`订购日期`)<7
group by o.`订单ID`;
#17
select c.`类别名称`,round(avg(p.`单价`),2) as 平均价格
from 产品 p
left join 类别 c on p.`类别ID`=c.`类别ID`
group by c.`类别名称`;
#18
select `地区`,count(*) as 客户数
from 客户
group by `地区`;
```

## 4.练习30题

1. 找出供应商名称，所在城市
 ![](/img/image-20201202150320409.png)
2. 找出华北地区能够供应海鲜的所有供应商列表。
 ![](/img/image-20201202151530631.png)
3. 找出订单销售额前五的订单是经由哪家运货商运送的。
 ![](/img/image-20201202152902996.png)

4. 找出按箱包装的产品名称。
 ![](/img/image-20201202153304687.png)


5. 找出重庆的供应商能够供应的所有产品列表。
 ![](/img/image-20201202153809507.png)


6. 找出雇员郑建杰所有的订单并根据订单销售额排序。
 ![](/img/image-20201202154807148.png)


7. 找出订单10284的所有产品以及订单金额，运货商。
 ![](/img/image-20201202155416873.png)


8. 建立产品与订单的关联。
 ![](/img/image-20201202155740237.png)


9. 计算销量前10位的订单明细，结果集返回订单ID，订单日期，公司名称，发货日期，销售额，并排序
 <img src="/img/image-20201202161127489.png" style="zoom:67%;" />


10. 按年度统计销售额
 ![](/img/image-20201202161807701.png)

```sql
#1
select `公司名称`,`城市`
from 供应商;
#2
select s.`公司名称`
from 产品 p
left join 类别 c on p.`类别ID`=c.`类别ID`
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
where c.`类别名称`='海鲜'
group by s.`供应商ID`;
#3
select t.`公司名称`,round(sum(d.`单价`*d.`数量`*(1-d.`折扣`)),2) as 销售额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 运货商 t on o.`运货商`=t.`运货商ID`
group by o.`订单ID`
order by sum(d.`单价`*d.`数量`*(1-d.`折扣`)) desc
limit 5;
#4
select `产品名称`
from 产品
where `单位数量` like '%箱%';
#5
select p.`产品名称`
from 产品 p
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
where s.`城市`='重庆';
#6
select o.`订单ID`,round(d.`单价`*d.`数量`*(1-d.`折扣`),2) 销售额
from 订单 o
left join 雇员 e on o.`雇员ID`=e.`雇员ID`
left join 订单明细 d on o.`订单ID`=d.`订单ID`
where e.`名字`='建杰' and e.`姓氏`='郑'
order by d.`单价`*d.`数量`*(1-d.`折扣`) desc;
#7
select p.`产品名称`,round(d.`单价`*d.`数量`*(1-d.`折扣`),2) 订单金额,t.`公司名称`
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
left join 运货商 t on o.`运货商`=t.`运货商ID`
where o.`订单ID`=10284;
#8
select *
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`;
#9
select o.`订单ID`,o.`订购日期`,t.`公司名称`,o.`发货日期`,round(d.`单价`*d.`数量`*(1-d.`折扣`),2) 销售额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 运货商 t on o.`运货商`=t.`运货商ID`
group by o.`订单ID`
order by sum(d.`数量`) desc
limit 10;
#10
select year(o.`订购日期`) as 年份,round(sum(d.`单价`*d.`数量`*(1-d.`折扣`)),2) as 销售额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
group by year(o.`订购日期`);
```



11.查询供应商中能够供应的产品样数最多的供应商。
 ![](/img/image-20201202163652917.png)

12.查询产品类别中包含的产品数量最多的类别。
 ![](/img/image-20201202164619416.png)

13.找出所有的订单中经由哪家运货商运货次数最多。
 ![](/img/image-20201202165744300.png)

14.按类别，产品分组，统计销售额。
 ![](/img/image-20201202203524663.png)

15.查询海鲜类别最大的一笔订单。
 ![](/img/image-20201202172555454.png)

16.**按季度统计销售量**![](/img/image-20201203084009488.png)

17.查出订单总额超出5000的所有订单，客户名称，客户所在地区。![](/img/image-20201202230711289.png)

18.查询哪些产品的年度销售额低于2000![](/img/image-20201202231252894.png)

19.查询所有订单ID开头为102的订单![](/img/image-20201202232702056.png)

20.查询所有“中硕贸易”，“学仁贸易”，“正人资源”，“中通”客户的订单，（要求使用in函数）![](/img/image-20201202234724081.png)

```sql
#11
select s.`公司名称`
from 产品 p
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
group by s.`供应商ID`
order by count(*) desc
limit 1;
#12
select c.`类别名称`
from 产品 p
left join 类别 c on p.`类别ID`=c.`类别ID`
group by c.`类别ID`
order by count(*) desc
limit 1;
#13
select t.`公司名称`
from 订单 o
left join 运货商 t on o.`运货商`=t.`运货商ID`
group by t.`运货商ID`
order by count(*) desc
limit 1;
#14
select c.`类别名称`,p.`产品名称`,round(sum(d.`单价`*d.`数量`*(1-d.`折扣`)),2) as 销售额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
left join 类别 c on p.`类别ID`=c.`类别ID`
group by c.`类别ID`,p.`产品ID`;
#15
select *
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
left join 类别 c on p.`类别ID`=c.`类别ID`
group by c.`类别ID`
having c.`类别名称`='海鲜'
order by sum(d.`单价`*d.`数量`*(1-d.`折扣`));
#16
select year(订购日期) 年,
round(sum(case when  month(订购日期) between 1 and 3 then d.单价*数量*(1-折扣) else 0 end),2) 一季度,
round(sum(case when  month(订购日期) between 4 and 6 then d.单价*数量*(1-折扣) else 0 end),2) 二季度,
round(sum(case when  month(订购日期) between 7 and 9 then d.单价*数量*(1-折扣) else 0 end),2) 三季度,
round(sum(case when  month(订购日期) between 10 and 12 then d.单价*数量*(1-折扣) else 0 end),2) 四季度
from 订单 o join 订单明细 d on o.订单ID=d.订单ID
group by 年;
#17
select o.`订单ID`,c.`联系人姓名`,c.`地区`
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 客户 c on o.`客户ID`=c.`客户ID`
group by o.`订单ID`
having sum(d.`单价`*d.`数量`*(1-d.`折扣`))>5000;
#18
select p.`产品名称`,round(sum(d.`单价`*d.`数量`*(1-d.`折扣`)),2) as 销售额
from 订单 o
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
group by d.`产品ID`
having sum(d.`单价`*d.`数量`*(1-d.`折扣`))<2000;
#19
select *
from 订单
where `订单ID` like '102%';
#20
select *
from 订单 o
left join 客户 c on o.`客户ID`=c.`客户ID`
where c.`公司名称` in ('中硕贸易','学仁贸易','正人资源','中通');
```



21.查询所有订单中月份不是单数的订单。![](/img/image-20201203081426282.png)

22.**分别各写一个查询，得到订单中折扣为15%，20%的所有订单，并将两个查询再组成一个。**![](/img/image-20201203084348790.png)

23.找出在入职时已超过30岁的所有员工信息![](/img/image-20201203084620189.png)

24.找出所有单价大于30的产品(附加要求，产品类别，供应商作为参数，当产品类别和供应商都为空的时候，nofilter)![](/img/image-20201203085600912.png)

25.查询所有库存产品的总额，并按照总额排序![](/img/image-20201203085921577.png)

26.**检索出职务为销售代表的所有订单中，每笔订单总额低于2000的订单明细，以及相关供应商名称。**![](/img/image-20201203092542779.png)

27.检索出向艾德高科技提供产品的供应商所在的城市

 ![](/img/image-20201203093732504.png)

28.计算每一笔订单的发货期（从订购到发货），运货期（从发货到到货）的时常，并按照发货期从长到短的顺序进行排序。![数据造假](/img/image-20201203100239023.png)![](/img/image-20201203100341454.png)

29.将产品表和运货商两个无关的表整合为一个表![](/img/image-20201203101453373.png)

30.获取在北京工作并向福星制衣厂股份有限公司发送过订单的职工名称。

![](/img/image-20201203101918390.png)

```sql
#21
select *
from 订单
where month(`订购日期`)%2=0;
#22
select o.`订单ID`,d.`折扣` from 订单 o left join 订单明细 d on o.`订单ID`=d.`订单ID` where d.`折扣` like 0.15
union
select o.`订单ID`,d.`折扣` from 订单 o left join 订单明细 d on o.`订单ID`=d.`订单ID` where d.`折扣` like 0.2;
#23
select *
from 雇员
where year(`雇用日期`-`出生日期`)>30;
#24
select *
from 产品 p
left join 类别 c on p.`类别ID`=c.`类别ID`
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
where c.`类别ID` is not null or s.`供应商ID` is not null;
#25
select `产品名称`,round(`单价`*`库存量`,2) as 总额
from 产品
order by `单价`*`库存量` desc;
#26
select d.`订单ID`,group_concat(d.`产品ID`) 产品,group_concat(d.`单价`) 单价,group_concat(d.`数量`) 数量,group_concat(d.`折扣`) 折扣,group_concat(s.`公司名称`) 公司
from 订单 o
left join `订单明细` d on o.`订单ID`=d.`订单ID`
left join `客户` c on o.`客户ID`=c.`客户ID`
left join `产品` p on d.`产品ID`=p.`产品ID`
left join `供应商` s on p.`供应商ID`=s.`供应商ID`
where c.`联系人职务`='销售代表'
group by o.`订单ID`
having sum(d.`单价`*d.`数量`*(1-d.`折扣`))<2000;
#27
select distinct(s.`公司名称`),s.`城市`
from 订单 o
left join 客户 c on o.`客户ID`=c.`客户ID`
left join 订单明细 d on o.`订单ID`=d.`订单ID`
left join 产品 p on d.`产品ID`=p.`产品ID`
left join 供应商 s on p.`供应商ID`=s.`供应商ID`
where c.`公司名称`='艾德高科技';
#28
select `订单ID`,datediff(`发货日期`,`订购日期`) as 发货期,datediff(`到货日期`,`发货日期`) as 运货期
from 订单
where `订购日期` is not null and `发货日期` is not null and `到货日期` is not  null
order by 发货期 desc;
#29
select p.*,group_concat(distinct t.`公司名称`) as 可运公司
from 订单 o
left join `订单明细` d on o.`订单ID`=d.`订单ID`
left join `产品` p on d.`产品ID`=p.`产品ID`
left join `运货商` t on o.`运货商`=t.`运货商ID`
group by p.`产品ID`;
#30
select distinct concat(e.`姓氏`,e.`名字`) as 名单
from 雇员 e
left join 订单 o on e.`雇员ID`=o.`雇员ID`
left join 客户 c on o.`客户ID`=c.`客户ID`
where e.`城市`='北京' and c.`公司名称`='福星制衣厂股份有限公司';
```