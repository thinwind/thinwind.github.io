---
layout: post
title:  "ES系列之二基础内容"
date:   2016-12-26 23:10:00 +0800
categories: [java, elasticsearch]
---

#### 基础内容

基础内容包括NTR(near realtime),cluster,node,index,type,document,shards&replicas.



**Near Realtime(NTR)**    

Elasticsearch是接近实时检索的平台。这意味着从为一个文档建立索引到可以检索，会有略微的延迟（通常是1秒）。

**簇（Cluster）**

一个簇（cluster）是一个或者多个节点（服务器）的集合，用来保存所有数据，并提供跨节点联合索引和检索的能力。一个簇通过一个独一无二的名字来标识，默认是“elasticsearch”。这个名字非常重要因为一个节点一旦通过名字加入一个簇，就只能是这个簇的一部分。  
   
必须确保在不同的环境中不能为簇使用相同的名字，否则可能导致节点被归入错误的簇。比如你可以在开发环境使用logging-dev, logging-stage, 和 logging-prod，在生产环境使用staging。    

记住一个簇只有单一节点是可行的，并且不会有任何问题。更进一步，可以同时使用多个不同名字的独立簇。

**节点（Node）**

 一个节点就是一个服务器，作为簇的一部分，存储数据，参与簇的索引和检索。跟簇一样，节点也是用name进行标识，默认是一个随机的UUID，在节点启动时被分配。如果不想使用默认的名称，可以自己定义任意的名称。为了方便管理，要区分网络中节点与服务器的对应关系时名称就显得比较重要。
 
 节点可以通过配置簇的名称来加入一个簇。默认每个节点被加入名为“elasticsearch”的簇，这意味着如果你启动几个节点--加入它们能够彼此互相发现--它们会自动建立并加入一个叫“elasticsearch”的簇。
 
 在一个节点中，可以添加任意多节点。更进一步，如果网络中没有其它正在运行的节点，启动一个单独的节点将会建立一个单节点簇，并将名字赋为“elasticsearch”。
 
 **索引（Index）**
 
 索引是有某种程度相似特性的文档的集合。比如，可以建立用户数据索引，产品类别索引，订单数据索引等。索引由name进行标识（name必须全部小写），并且在对文档进行索引、检索、更新和删除和，要使用name进行引用。
 
 在一个单独的簇中，可以定义任意多索引。
 
 **类型（Type）**
 
 在一个索引中，可以定义一种或多种类型。类型是索引的一个逻辑分类/分区，语法完全可以自己定义。一般来说，类型用来定义文档的共有域。比如，在一个博客系统中，将所有数据存储在一个索引中。在这个索引里，可以将用户数据定义为一种类型，博文数据定义为另一种类型，评论定为另一种类型。
 
 
 **文档（Document）**
 
 
 文档是索引的最小信息单元。比如，一个用户数据可以是一个文档，一种产品可以是一个文档，一个订单也可以是一个文档。文档用JSON进行表示，这是一种常见的网络交互数据模型。
 
 在索引/类型中，可以存储任意多的文档。记住虽然文档物理上存在于索引中，实际上必须被赋予索引内的某个类型。
 
 
**瓦片和拷贝（Shards & Replicas）**

索引有可能会存储的数据量超出单一节点的物理存储限制。比如，一个100万的文档的索引可能会占用1TB的磁盘空间，单节点无法存储，或者检索服务会非常慢。

为了解决这个问题，Elasticsearch提供了将索引拆分为瓦片的功能。在构建一个索引时，可以同时方便的定义瓦片的数量。每个瓦片都是一个功能完备，相互独立的“索引”，可以存储在簇中任意一个节点中。

瓦片有两个重要的意义：

* 允许横向切分/拓展容量
* 允许分布式并行跨瓦片操作（可能会跨多节点），来提高性能

瓦片的分布机制和文档如何聚合到检索结果是由Elasticsearch 进行管理，对用户来说是透明的。

在网络/云环境中，失败随时可能出现，热备切换预防单瓦片/节点失效是非常有用的，强烈建议这么做。最后，Elasticsearch 支持瓦片的复制，称为瓦片复制品，简称复制片。

复制片也有两个重要的意义：

* 提供高可用性预防单瓦片/节点失效。基于这个考虑，复制片绝对不会跟源瓦片分配到同一个节点。
* 能够拓展检索量／检索数，因为检索可以在所有的复制片上并行执行。

最后总结，每个索引可以拆分为多个瓦片。一个索引可以被复制0次或多次。一旦被复制，每个索引会有主瓦片（被复制的瓦片）和复制片（主瓦片的复制品）。每个索引的瓦片数量和复制片数量可以在创建索引时定义。索引创建成功以后，可以动态修改复制片的数量，但是不能修改瓦片的数量。

默认情况下，Elasticsearch中每个索引被切分为5个主瓦片和一个复制片，这意味着如果至少启动两个节点的情况下，每个索引会有5个主瓦片和5个复制片（一个完整的复制片）总共十个瓦片。


P.S. 每个Elasticsearch瓦片是一个Lucene索引。每个Lucene索引允许的文档数有限制，在LUCENE-5843规范中，这个限制是2,147,483,519 (= Integer.MAX_VALUE - 128) 。可以用`_cat/shards api`来监测瓦片的大小。

下一章将是最好玩儿的部分，敬请期待。
 

