---
layout: post
title:  "ES系列之九探索你的数据(四)"
date:   2017-1-5 23:02:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_executing_filters.html*



#### 进行过滤

在前面的部分，略过了文档得分（检索结果中`_score`属性）的一些细节。得分是一个关于文档跟检索条件匹配程度的数值。得分越高，文档的相关性越好；得分越低，相关性越差。

但是检索并不总是需要去打分，尤其是仅仅对数据文档集进行“过滤”时。Elasticsearch检测这些情况并自动优化检索过程，避免无用的打分过程浪费计算时间。

上面介绍的`bool`查询也支持`filter`子句，能够查询来限制其它查询从句匹配的结果，而不改变得分的计算。比如在下面的示例中，我们介绍`range`查询，能够通过一段值来过滤检索结果。这种查询一般用在数值或者日期字段上。

下面的例子使用一个布尔查询所有`balance`值介于20000和30000的账号（包含两端）。换句话说，我们在试图找到所有`balance`大于等于20000同时小于等于30000的所有文档：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": { "match_all": {} },
      "filter": {
        "range": {
          "balance": {
            "gte": 20000,
            "lte": 30000
          }
        }
      }
    }
  }
}'
```

结果：

```javascript
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 217,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "253",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 253,
          "balance" : 20240,
          "firstname" : "Melissa",
          "lastname" : "Gould",
          "age" : 31,
          "gender" : "M",
          "address" : "440 Fuller Place",
          "employer" : "Buzzopia",
          "email" : "melissagould@buzzopia.com",
          "city" : "Lumberton",
          "state" : "MD"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "400",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 400,
          "balance" : 20685,
          "firstname" : "Kane",
          "lastname" : "King",
          "age" : 21,
          "gender" : "F",
          "address" : "405 Cornelia Street",
          "employer" : "Tri@Tribalog",
          "email" : "kaneking@tri@tribalog.com",
          "city" : "Gulf",
          "state" : "VT"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "520",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 520,
          "balance" : 27987,
          "firstname" : "Brandy",
          "lastname" : "Calhoun",
          "age" : 32,
          "gender" : "M",
          "address" : "818 Harden Street",
          "employer" : "Maxemia",
          "email" : "brandycalhoun@maxemia.com",
          "city" : "Sidman",
          "state" : "OR"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "645",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 645,
          "balance" : 29362,
          "firstname" : "Edwina",
          "lastname" : "Hutchinson",
          "age" : 26,
          "gender" : "F",
          "address" : "892 Pacific Street",
          "employer" : "Essensia",
          "email" : "edwinahutchinson@essensia.com",
          "city" : "Dowling",
          "state" : "NE"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "734",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 734,
          "balance" : 20325,
          "firstname" : "Keri",
          "lastname" : "Kinney",
          "age" : 23,
          "gender" : "M",
          "address" : "490 Balfour Place",
          "employer" : "Retrotex",
          "email" : "kerikinney@retrotex.com",
          "city" : "Salunga",
          "state" : "PA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "784",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 784,
          "balance" : 25291,
          "firstname" : "Mabel",
          "lastname" : "Thornton",
          "age" : 21,
          "gender" : "M",
          "address" : "124 Louisiana Avenue",
          "employer" : "Zolavo",
          "email" : "mabelthornton@zolavo.com",
          "city" : "Lynn",
          "state" : "AL"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "880",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 880,
          "balance" : 22575,
          "firstname" : "Christian",
          "lastname" : "Myers",
          "age" : 35,
          "gender" : "M",
          "address" : "737 Crown Street",
          "employer" : "Combogen",
          "email" : "christianmyers@combogen.com",
          "city" : "Abrams",
          "state" : "OK"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "14",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 14,
          "balance" : 20480,
          "firstname" : "Erma",
          "lastname" : "Kane",
          "age" : 39,
          "gender" : "F",
          "address" : "661 Vista Place",
          "employer" : "Stockpost",
          "email" : "ermakane@stockpost.com",
          "city" : "Chamizal",
          "state" : "NY"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "19",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 19,
          "balance" : 27894,
          "firstname" : "Schwartz",
          "lastname" : "Buchanan",
          "age" : 28,
          "gender" : "F",
          "address" : "449 Mersereau Court",
          "employer" : "Sybixtex",
          "email" : "schwartzbuchanan@sybixtex.com",
          "city" : "Greenwich",
          "state" : "KS"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "204",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 204,
          "balance" : 27714,
          "firstname" : "Mavis",
          "lastname" : "Deleon",
          "age" : 39,
          "gender" : "F",
          "address" : "400 Waldane Court",
          "employer" : "Lotron",
          "email" : "mavisdeleon@lotron.com",
          "city" : "Stollings",
          "state" : "LA"
        }
      }
    ]
  }
}
```

仔细分析上面的例子，这个bool查询包含一个`match_all`查询和一个`range`查询（过滤部分）。可以使用其它任何查询取代查询和过滤部分的查询。上面的情况中，`range`查询对待所有的文档是一致的，比如，没有一个比另一个相关性更高。

除了上面介绍的`match_all`、`match`、`bool`和`range`查询，还有许多其他种类的查询可用，我们暂时不再介绍。既然我们已经基本上了解了Elasticsearch用法，把这些知识点应用到其他种类的查询的学习和测试应该也没有太大的难度。

