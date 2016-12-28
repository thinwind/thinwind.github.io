---
layout: post
title:  "ES系列之四了解簇"
date:   2016-12-28 01:11:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_exploring_your_cluster.html*



#### 了解簇

**The REST API**

现在节点（和簇）已经启动正常运行，接下来学习怎样与它进行交互。幸运的是，Elasticsearch提供了非常完善和犀利的REST接口以便于用户使用。利用这些接口可以完成以下功能：         

* 监测簇、节点、索引的健康、状态和各种统计信息
* 管理簇、节点和索引数据及元数据
* 对索引进行增删改查（CRUD）和检索
* 进行高级检索，比如分页、排序、过滤、scripting（这个不会翻译）、聚合等等操作。


**簇的健康**

下面从一个基础的健康检测开始，看看簇是如何工作的。以下的操作通过`curl`进行，你也可以选择其它的HTTP/REST工具。假定仍在上一篇中启动的节点上，重新打开一个新的终端。

用`_cat API`来查看簇的健康状况。可以在命令窗口中输入：

`curl -XGET 'localhost:9200/_cat/health?v&pretty'`

结果可能是这样的：

```bash
epoch      timestamp cluster         status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1482857127 00:45:27  my_cluster_name green           1         1      0   0    0    0        0             0                  -                100.0%
```

可以看到“my_cluster_name”这个簇启动并且运行状态是绿色。每次查询健康状况，会得到三种状态：绿色、黄色和红色。绿色代表各个组件运行良好（簇所有功能正常运行）；黄色代表数据可用但是有些复制片尚未被分配和存储（簇所有功能正常运行）。红色意味着因为某些原因数据不可用。记住即使簇是红色，它的某些功能也是正常的（比如还可以继续在可用瓦片上响应请求），但是因为已经有数据丢失，最好是尽快进行修复。

同时从响应中可以看到只有一个节点，0个瓦片，因为还没有数据存进来。由于Elasticsearch默认采用单播网络发现来自动查找同一台机子上的其它节点。有可能你不小心在一台机子上启动了两个节点，并且它们属于同一个簇，这种情况下将会看到不止一个节点。

可以使用下面的指令列出簇中所有的节点：

```base
curl -XGET 'localhost:9200/_cat/nodes?v&pretty'
```

结果可能是这样的：

```bash
ip        heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
127.0.0.1           10          97   6    2.80                  mdi       *      my_node_name
```

可以看到名为"my_node_name"的节点，这是当前簇中唯一的节点。

**显示所有索引**

下面瞄一眼所有的索引：

```bash
curl -XGET 'localhost:9200/_cat/indices?v&pretty'
```

得到的结果可能如下：

```bash
health status index uuid pri rep docs.count docs.deleted store.size pri.store.size
```

这说明当前簇中还没有索引。

**创建索引**

下面我们首先创建一个名叫“customer”的索引，然后再显示所有索引。

```bash
curl -XPUT 'localhost:9200/customer?pretty&pretty'
curl -XGET 'localhost:9200/_cat/indices?v&pretty'
```

第一条命令使用put请求创建了一个名为“customer”的索引。我们简单的将`pretty`放到请求结尾，让响应以易读形式打印。结果如下：

```javascript
{
  "acknowledged" : true,
  "shards_acknowledged" : true
}
```

第二个命令的结果如下：

```bash
health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   customer arjULDnoTMCInP6Jz2hGIQ   5   1          0            0       650b           650b
```

这个结果显示现在有1个名为“customer”的索引，有5个主瓦片和一个复制片（默认数量），有0个文档。

你可能注意到这个索引的健康状况是黄色。回想一下之前的说明，黄色代表了有复制片还没有被分配。这个索引出现这种现象，是因为Elasticsearch默认为它创建了一个复制片；既然当前就只有一个节点，复制片就无法被分配到不同的节点（为了高可用），除非有其它节点加入到当前簇。一旦复制片被分配到另一个节点，索引的健康状况将会变成绿色。

**为文档建立索引并检索**

下面给customer索引加点料。回想一下，曾说过要给文档建立索引，必须明确告诉Elasticsearch这个文档应该划归为哪种类型。
下面在customer索引中新增一个简单的文档，定为"external"类型，并将id赋为1。

```bash
curl -XPUT 'localhost:9200/customer/external/1?pretty&pretty' -d'
{
  "name": "John Doe"
}'
```

得到如下的结果：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "created" : true
}
```

从上面的结果，我们可以看出来一个新的文档被成功创建到customer索引中，并被归入external类型。文档内置id为1，跟创建时所声明的一致。

注意一下，Elasticsearch并不要求在将文档加入索引前必须先显式创建该索引。上面的例子，如果没有先创建customer索引，Elasticsearch将会自动创建它。

接下来获取刚刚建立索引的文档：

```bash
curl -XGET 'localhost:9200/customer/external/1?pretty&pretty'
```

结果如下：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "1",
  "_version" : 1,
  "found" : true,
  "_source" : {
    "name" : "John Doe"
  }
}
```

这里`found`属性应该关注一下，它表明找到了ID为1的文档，另一个属性，`_source`，保存了之前加入的完整的JSON文档。

**删除索引**

下面删除之前创建的索引，然后再查看一次所有索引：

```bash
curl -XDELETE 'localhost:9200/customer?pretty&pretty'
curl -XGET 'localhost:9200/_cat/indices?v&pretty'
```

结果：

```bash
health status index uuid pri rep docs.count docs.deleted store.size pri.store.size
```

这说明索引被成功删除，我们又回到最开始没有索引的状态。

在继续下一步之前，我们再来审视一下学过的API命令：

```bash
curl -XPUT 'localhost:9200/customer?pretty'
curl -XPUT 'localhost:9200/customer/external/1?pretty' -d'
{
  "name": "John Doe"
}'
curl -XGET 'localhost:9200/customer/external/1?pretty'
curl -XDELETE 'localhost:9200/customer?pretty'
```

如果仔细观察上面的命令，可以看到获取Elasticsearch数据的模式。这个模式形式如下：

```html
<REST Verb> /<Index>/<Type>/<ID>
```

这种使用模式将会贯穿所有的API命令，记住这点，是掌握Elasticsearch的一个好的开始。


