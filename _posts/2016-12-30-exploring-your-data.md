---
layout: post
title:  "ES系列之六探索你的数据"
date:   2016-12-29 22:45:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_exploring_your_data.html*



#### 样例数据集

如果你是从开始看到现在，那么对Elasticsearch应该有了最基础的了解。如果没有，建议从头读一遍。接下来工作将在接近实际环境的数据集上展开。这里准备了一份用户银行账号信息的虚构JSON文档。每个文档都有如下结构：

```javascript
{
    "account_number": 0,
    "balance": 16623,
    "firstname": "Bradshaw",
    "lastname": "Mckenzie",
    "age": 29,
    "gender": "F",
    "address": "244 Columbus Place",
    "employer": "Euron",
    "email": "bradshawmckenzie@euron.com",
    "city": "Hobucken",
    "state": "CO"
}
```

你也许会感到奇怪，这些值和语法看起来很怪异，实际上它们是在[www.json-generator.com](www.json-generator.com)上生成的，这些全都是随机值。

#### 载入样例数据集

你可以从[这里](https://github.com/elastic/elasticsearch/blob/master/docs/src/test/resources/accounts.json?raw=true)下载样例数据集。把它当到当前目录，然后按照下面的命令把它加载到簇中：

```bash
curl -XPOST 'localhost:9200/bank/account/_bulk?pretty&refresh' --data-binary "@accounts.json"
curl 'localhost:9200/_cat/indices?v'
```

结果如下：

```bash
health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   customer aHuZLSakQNGcFgTMiyIXaA   5   1          2            0      7.4kb          7.4kb
yellow open   bank     4aK4OrQOSWexaj54oCE4ag   5   1       1000            0    640.2kb        640.2kb
```

这意味着我们刚刚将批量的为1000个文档放倒bank索引中，类型为account。




