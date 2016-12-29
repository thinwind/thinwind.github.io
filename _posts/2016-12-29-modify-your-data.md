---
layout: post
title:  "ES系列之五修改你的数据"
date:   2016-12-29 22:45:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_modifying_your_data.html*




### 修改你的数据

Elasticsearch在数据操作和可检索性上近乎实时（NRT near real time）。默认情况下，从对数据进行索引/更新/删除到显示到检索结果，有1秒钟的延迟。

<p> </p>
#### 索引/替换文档

之前已经讲过怎么为一个文档建立索引。下面再来一遍：

```base 
curl -XPUT 'localhost:9200/customer/external/1?pretty&pretty' -d'
{
  "name": "John Doe"
}'
```

上面的命令再一次把这个文档添加到当前索引中，类型为external，ID为1。如果将上面的命令再执行一次，并使用不同（也可以相同）的文档，Elasticsearch将会用新文档替换掉（重新进行索引）已经存在的ID为1的旧文档。

```bash
curl -XPUT 'localhost:9200/customer/external/1?pretty&pretty' -d'
{
  "name": "Jane Doe"
}'
```

上面的命令将ID为1的文档name属性从John Doe修改为Jane Doe。假如使用一个不同的ID，将会建立一个新的索引文档，已有的文档保持不变。

```bash
curl -XPUT 'localhost:9200/customer/external/2?pretty&pretty' -d'
{
  "name": "Jane Doe"
}'
```

上面的命令建立一个新的索引文档，ID为2。

在构建索引时，ID部分是可选的。如果没有声明，Elasticsearch将会生成一个随机ID，然后用这个ID构建索引。Elasticsearch 生成的实际ID（或者在之前例子中明确指出的其他说明）是索引API返回结果的一部分。

下面的命令演示怎样隐式建立一个索引文档：

```bash
curl -XPOST 'localhost:9200/customer/external?pretty&pretty' -d'
{
  "name": "Jane Doe"
}
```

结果是类似下面的返回值：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "AVlK_gKeP8x3EOoPo6Ss",
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

注意上面的情况，我们使用POST动作而不是PUT，这是因为没有声明ID。

#### 更新文档

除了能够建立和替换索引文档，还能更新这些文档。但是注意Elasticsearch内在机制并不是将文档原地更新。无论何时进行更新操作，Elasticsearch会删除旧的索引文档，然后建立应用更新后的文档索引。

下面的例子演示如何将之前的文档name属性修改为“Jane Doe”：

```bash
curl -XPOST 'localhost:9200/customer/external/1/_update?pretty&pretty' -d'
{
  "doc": { "name": "Jane Doe" }
}'
```

得到的结果如下：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "1",
  "_version" : 2,
  "result" : "noop",
  "_shards" : {
    "total" : 0,
    "successful" : 0,
    "failed" : 0
  }
}
```

下面的例子演示如何将之前的文档（ID为1）的name属性修改为"Sany Shang"，同时增加age属性。

```bash
curl -XPOST 'localhost:9200/customer/external/1/_update?pretty&pretty' -d'
{
  "doc": { "name": "Sany Shang", "age": 20 }
}'
```

得到结果如下：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "1",
  "_version" : 3,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  }
}
```

更新语句可以包含简单的脚本。下面的例子利用脚本将年龄增加5岁：

```bash
curl -XPOST 'localhost:9200/customer/external/1/_update?pretty&pretty' -d'
{
  "script" : "ctx._source.age += 5"
}'
```

结果如下：

```javascript
{
  "_index" : "customer",
  "_type" : "external",
  "_id" : "1",
  "_version" : 4,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  }
}
```

上面命令中，ctx._source 指向当前要被更新的源文档。

注意，在编写此文档时，只允许一次更新一个文档。也许以后Elasticsearch会提供一次更新多个文档的方法（就像`UPDATE-WHERE`SQL语句那样）。

#### 删除文档

删除文档是相当直观的。下面的例子展示了怎样删除之前创建的ID为2的文档：

```bash
curl -XDELETE 'localhost:9200/customer/external/2?pretty&pretty'
```
结果如下：

```javascript
{
  "found" : false,
  "_index" : "customer",
  "_type" : "external",
  "_id" : "2",
  "_version" : 1,
  "result" : "not_found",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  }
}
```

请查阅[Delete By Query API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html)如何删除匹配某个特定检索结果的所有文档。值得注意的是删除整个索引的效率要远高于利用Delete By Query API删除索引中的所有文档。


#### 批量处理

除了能够对单独的文档进行创建、更新和删除之外，Elasticsearch还提供了`_bulk API`，用来批量执行这些操作。这个功能非常重要，因为它可以通过很少的网络交互次数，快速的执行大量的操作。

下面的例子演示一个批量语句中构建两个文档：

```bash
curl -XPOST 'localhost:9200/customer/external/_bulk?pretty&pretty' -d'
{"index":{"_id":"1"}}
{"name": "John Doe" }
{"index":{"_id":"2"}}
{"name": "Jane Doe" }'
```

结果如下：

```javascript
{
  "took" : 10,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "1",
        "_version" : 5,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "created" : false,
        "status" : 200
      }
    }
  ]
}
```

接下来的例子，在一个批量语句中，更新第一个文档（ID为1），然后删除第二个文档（ID为2）：

```bash
curl -XPOST 'localhost:9200/customer/external/_bulk?pretty&pretty' -d'
{"update":{"_id":"1"}}
{"doc": { "name": "John Doe becomes Jane Doe" } }
{"delete":{"_id":"2"}}'
```

结果如下：

```javascript
{
  "took" : 6,
  "errors" : false,
  "items" : [
    {
      "update" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "1",
        "_version" : 6,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "status" : 200
      }
    }
  ]
}
```

注意上面命令中删除指令，没有列出对应的源文档，因为删除仅仅需要被删文档的ID就足够了。

`bulk API`顺序执行批量语句中的指令。如果某一个指令由于任何原因失败了，将会继续处理剩下的指令。当`bulk API`执行完，返回结果中包含每个指令的执行结果（与输入的顺序是一样的）。依此可以检查每个指令是不是成功执行。


