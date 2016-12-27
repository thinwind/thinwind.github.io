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

