---
layout: post
title:  "ES系列之七探索你的数据(二)"
date:   2017-1-1 21:41:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_introducing_the_query_language.html*


#### 查询语言简介

Elasticsearch使用了JSON式的DSL来进行查询。被称为查询DSL。这个查询语言很完备，初次接触可能会被吓到，实际学习中最简单的方式就是从基本的例子开始：

回想一下上一节最后的查询，执行的命令是：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} }
}'
```

细看一下上面的命令，`query`部分说明了查询的条件是怎么定义的，`match_all`查询表明在特定的索引中简单的检索所有的文档。

在`query`基础上，还可以传递其它参数来影响检索的结果。上面的查询中还发送了`sort`，下面增加`size`：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} },
  "size": 1
}'
```

注意如果`size`没有明确赋值，默认值为10。

下面的查询匹配所有结果，并返回第11到20个文档：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} },
  "from": 10,
  "size": 10
}'
```

`from`参数（从0开始）指定结果从哪个文档开始，`size`参数说明结果包含文档的总数。这个特性在实现分页时非常有用。记住如果`from`没有声明，默认为0.

下面的检索匹配所有的文档，并使用balance字段降序排列，返回前10条结果（默认10条）。

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} },
  "sort": { "balance": { "order": "desc" } }
}'
```

