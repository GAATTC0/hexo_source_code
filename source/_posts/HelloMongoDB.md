---
title: Hello MongoDB
abbrlink: a0735a7e
date: 2020-12-31 10:22:52
update: 2021-1-14 9:34:19
categories:
  - 学习
  - 数据库
tags:
  - mongodb
img: /img/mongodb-img.jpg
---

# HelloMongoDB - MongoDB的学习之路(还很长)

> 官网：https://www.mongodb.com/try

## 一.安装和使用

进入官网，一般本地使用的话还是选择On-Premises，学习的话下载社区版就够用了。

我使用的是社区版msi安装，版本v4.4.2。

安装路径最好还是custom，下一步网不好的话还是不勾选**"install mongoDB compass"**图形界面(其实在国内网都好不到哪去，不建议在这里下载浪费时间)，后面可以自己单独去官网[下载](https://www.mongodb.com/download-center/compass)，用IDM的话还是可以几分钟就下好的。

### 1.配置MongoDB目录结构

以Windows操作系统为例，在安装MongoDB的盘符的根目录创建一个 `data` 的目录然后在 data 目录里创建 `db` 目录：

比如我安装在G盘下

```bash
g:
md "\data\db"
```

在安装目录的bin路径下执行：

```bash
G:\MongoDB\bin\mongod --dbpath g:\data\db
```

### 2.命令行下的使用

在bin目录下使用命令mongo即可进入命令行客户端，进行增删改查等。

![](/img/image-20201231104927831.png)

当然也可以将这个目录加入到环境变量方便在任何地方打开。

### 3.安装MongoDB服务

在data文件夹下创建log文件夹，mongodb安装目录下创建配置文件mongod.cfg内容如下：

```yml
systemLog:
    destination: file
    path: g:\data\log\mongod.log
storage:
    dbPath: g:\data\db
```

也可以配置ip、端口等更详细的内容，参考：https://www.cnblogs.com/phpandmysql/p/7763394.html

然后bin下执行：

```bash
mongod --config "C:\mongodb\mongod.cfg" --install
```

## 二.密码权限设置

### 1.先看看之前配置是否正确可以查看数据库

在执行mongo命令后输入：

```mongo
show dbs
```

可以看到admin库：

![](/img/image-20201231111142370.png)

### 2.进入admin数据库

```mongo
use admin
```

### 3.创建管理员账户

```mongo
db.createUser({ user: "admin", pwd: "password", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })
```

这里自己设置用户名和密码，该账户角色是`userAdminAnyDatabase`，用来管理其他账户。

### 4.创建root账户，管理数据库，相当于mysql的root账户

```mongo
db.createUser({user: "root",pwd: "password", roles: [ { role: "root", db: "admin" } ]})
```

### 5.(可选)给某个数据库创建管理员

比如使用`fine`数据库，先进入之：

```mongo
use fine
```

然后创建账户：

```mongo
db.createUser({user: "user",pwd: "password",roles: [ { role: "dbOwner", db: "fine" } ]})
```

这里的role选`dbOwner`的话代表拥有该数据库的最高权限，选`readWrite`的话顾名思义只有读写权。

### 6.切换用户

```mongo
use admin
db.auth("admin","password")
```

### 7.使用url连接mongodb

```url
mongodb://user:password2@localhost/database
```

## 三.使用MongoDB Compass

### 1.官网下载安装即可。

### 2.连接

按以下格式连接

![](/img/image-20201231112712882.png)

如果没设置密码，也可以直接连接(不过不建议，如果在公网上极其容易被黑然后被勒索比特币😂)：

```url
mongodb://127.0.0.1:27017
```

### 3.手动输入每一项的连接方式

点击右上角的`Fill in connection fields individually`，下面选用户名密码即可。

<img src="/img/image-20201231113114765.png" style="zoom:67%;" />

### 4.操作

图形界面很方便明了。

<img src="/img/image-20201231113242418.png" alt="image-20201231113242418" style="zoom:67%;" />

## 四.MongoDB语法

### 1.查看所有数据库

```mongo
show dbs
```

### 2.进入数据库

```mongo
use {dbname}
```

### 3.查询数据

```mongo
db.{collection}.find({query}, {projection})
```

- **query** ：可选，使用查询操作符指定查询条件。
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

可以在后面再加一个格式化方便阅读，语法如下：

```mongo
db.{collection}.find({query}, {projection}).pretty() 
```

### 4.查询条件语法

```mongo
等于：find({"key":"value"})
小于：find({"key":{$lt:100}})
小于等于：find({"key":{$lte:100}})
大于：find({"key":{$gt:100}})
大于等于：find({"key":{$gte:100}})
不大于：find({"key":{$ne:100}})
```

and条件：

```mongo
find({key1:value1, key2:value2})
```

or条件：

```mongo
find({$or: [{key1: value1}, {key2:value2}]})
```

两者结合：

```mongo
find({"key1": {$gt:100}, $or: [{"key2": "10"},{"key3": "20"}]})
```

## 五.java中使用

### 1.准备

使用`mongo-java-driver-3.12.7`为例，配置依赖。

### 2.数据库连接

可以使用lambda表达式创建mongo client：

```java
MongoClient client = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder -> builder.hosts(Collections.singletonList(new ServerAddress({host}, {port}))))
                        .credential(MongoCredential.createCredential({{username}, {authDB}, {pwd}.toCharArray()))
                        .build()
        );
```

### 3.获取数据库

```java
MongoDatabase db = client.getDatabase({db});
```

### 4.获取文档集合

```java
MongoCollection<Document> col = db.getCollection({collection});
```

### 5.创建过滤条件(可选)

```java
List<Bson> filter = new LinkedList<>();
filter.add(eq({key}, {value}));
```

### 6.按条件查询出文档

```java
FindIterable<Document> documents = coll.find(and(filter)).projection(new BasicDBObject("_id", 0));
```

> 这里的projection后面值为0表示不查询`_id`字段

### 7.对文档遍历

```java
MongoCursor<Document> cursor = documents.iterator();
while (cursor.hasNext()) {
            Document next = cursor.next();
            Set<String> keys = next.keySet();
            for (String key : keys) {
                Object o = next.get(key);
                //dosomething...
}
```

### 8.关闭客户端防止内存泄漏

```java
client.close();
```



<hr>

待更新...