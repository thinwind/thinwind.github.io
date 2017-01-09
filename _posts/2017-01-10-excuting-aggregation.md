---
layout: post
title:  "ES系列之十探索你的数据(五)"
date:   2017-1-10 00:32:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_executing_aggregations.html*




#### 进行聚合

聚合提供了从数据中组合和提取统计信息的能力。最简单的认识聚合的方式就是把它粗略的看作是`SQL GROUP BY`和`SQL 聚合函数`。在Elasticsearch中，在一次响应中可以返回执行检索匹配到的结果，同时返回与此独立的聚合结果。利用简洁明了的API，可以进行多种查询和聚合操作，在一次请求中返回所有（也可以单独）结果，能够避免多次网络连接，这是十分强有力而且高效的。

作为第一个示例，下面的操作利用州（state）将账号进行分组，然后返回按照数量（count）降序排列（默认）的前10个结果（默认数量）：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      }
    }
  }
}'
```

在`SQL`中，上面的聚合操作类似于：

```SQL
SELECT state, COUNT(*) FROM bank GROUP BY state ORDER BY COUNT(*) DESC
```


查询结果：

```javascript
{
  "took" : 90,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1000,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "group_by_state" : {
      "doc_count_error_upper_bound" : 20,
      "sum_other_doc_count" : 770,
      "buckets" : [
        {
          "key" : "ID",
          "doc_count" : 27
        },
        {
          "key" : "TX",
          "doc_count" : 27
        },
        {
          "key" : "AL",
          "doc_count" : 25
        },
        {
          "key" : "MD",
          "doc_count" : 25
        },
        {
          "key" : "TN",
          "doc_count" : 23
        },
        {
          "key" : "MA",
          "doc_count" : 21
        },
        {
          "key" : "NC",
          "doc_count" : 21
        },
        {
          "key" : "ND",
          "doc_count" : 21
        },
        {
          "key" : "ME",
          "doc_count" : 20
        },
        {
          "key" : "MO",
          "doc_count" : 20
        }
      ]
    }
  }
}
```

可以看到有27个账号在`ID` (Idaho)内，接下来是27个账号在`TX`（Texas），再下面是25个账号在`AL`(Alabama)，依次类推。

注意设置`size=0`来不显示匹配的结果，因为我们只想在响应中看聚合的结果。

在前面示例的基础上，下面的查询计算以州（state）为单位，账号中结余的平均值（跟之前一样，只显示按照数量倒序排列的前10个）：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
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
  "took" : 21,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1000,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "group_by_state" : {
      "doc_count_error_upper_bound" : 20,
      "sum_other_doc_count" : 770,
      "buckets" : [
        {
          "key" : "ID",
          "doc_count" : 27,
          "average_balance" : {
            "value" : 24368.777777777777
          }
        },
        {
          "key" : "TX",
          "doc_count" : 27,
          "average_balance" : {
            "value" : 27462.925925925927
          }
        },
        {
          "key" : "AL",
          "doc_count" : 25,
          "average_balance" : {
            "value" : 25739.56
          }
        },
        {
          "key" : "MD",
          "doc_count" : 25,
          "average_balance" : {
            "value" : 24963.52
          }
        },
        {
          "key" : "TN",
          "doc_count" : 23,
          "average_balance" : {
            "value" : 29796.782608695652
          }
        },
        {
          "key" : "MA",
          "doc_count" : 21,
          "average_balance" : {
            "value" : 29726.47619047619
          }
        },
        {
          "key" : "NC",
          "doc_count" : 21,
          "average_balance" : {
            "value" : 26785.428571428572
          }
        },
        {
          "key" : "ND",
          "doc_count" : 21,
          "average_balance" : {
            "value" : 26303.333333333332
          }
        },
        {
          "key" : "ME",
          "doc_count" : 20,
          "average_balance" : {
            "value" : 19575.05
          }
        },
        {
          "key" : "MO",
          "doc_count" : 20,
          "average_balance" : {
            "value" : 24151.8
          }
        }
      ]
    }
  }
}
```

注意看聚合操作`average_balance`是如何嵌套进`group_by_state`中去的。这是聚合查询中一个通用模式。你可以任意的在聚合中嵌套聚合，以便能够获取到数据的关键摘要信息。

在前面示例基础上，下面按照结余平均值进行排序：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword",
        "order": {
          "average_balance": "desc"
        }
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
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
  "took" : 8,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1000,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "group_by_state" : {
      "doc_count_error_upper_bound" : -1,
      "sum_other_doc_count" : 918,
      "buckets" : [
        {
          "key" : "AL",
          "doc_count" : 6,
          "average_balance" : {
            "value" : 41418.166666666664
          }
        },
        {
          "key" : "SC",
          "doc_count" : 1,
          "average_balance" : {
            "value" : 40019.0
          }
        },
        {
          "key" : "AZ",
          "doc_count" : 10,
          "average_balance" : {
            "value" : 36847.4
          }
        },
        {
          "key" : "VA",
          "doc_count" : 13,
          "average_balance" : {
            "value" : 35418.846153846156
          }
        },
        {
          "key" : "DE",
          "doc_count" : 8,
          "average_balance" : {
            "value" : 35135.375
          }
        },
        {
          "key" : "WA",
          "doc_count" : 7,
          "average_balance" : {
            "value" : 34787.142857142855
          }
        },
        {
          "key" : "ME",
          "doc_count" : 3,
          "average_balance" : {
            "value" : 34539.666666666664
          }
        },
        {
          "key" : "OK",
          "doc_count" : 9,
          "average_balance" : {
            "value" : 34529.77777777778
          }
        },
        {
          "key" : "CO",
          "doc_count" : 13,
          "average_balance" : {
            "value" : 33379.769230769234
          }
        },
        {
          "key" : "MI",
          "doc_count" : 12,
          "average_balance" : {
            "value" : 32905.916666666664
          }
        }
      ]
    }
  }
}
```

下面的示例演示如何通过年龄段（20-29，30-29，40-49）进行分组，其次按照性别，最后获取每个年龄段，每种性别的账号结余平均值：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "size": 0,
  "aggs": {
    "group_by_age": {
      "range": {
        "field": "age",
        "ranges": [
          {
            "from": 20,
            "to": 30
          },
          {
            "from": 30,
            "to": 40
          },
          {
            "from": 40,
            "to": 50
          }
        ]
      },
      "aggs": {
        "group_by_gender": {
          "terms": {
            "field": "gender.keyword"
          },
          "aggs": {
            "average_balance": {
              "avg": {
                "field": "balance"
              }
            }
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
  "took" : 10,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1000,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "group_by_age" : {
      "buckets" : [
        {
          "key" : "20.0-30.0",
          "from" : 20.0,
          "to" : 30.0,
          "doc_count" : 451,
          "group_by_gender" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "M",
                "doc_count" : 232,
                "average_balance" : {
                  "value" : 27374.05172413793
                }
              },
              {
                "key" : "F",
                "doc_count" : 219,
                "average_balance" : {
                  "value" : 25341.260273972603
                }
              }
            ]
          }
        },
        {
          "key" : "30.0-40.0",
          "from" : 30.0,
          "to" : 40.0,
          "doc_count" : 504,
          "group_by_gender" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "F",
                "doc_count" : 253,
                "average_balance" : {
                  "value" : 25670.869565217392
                }
              },
              {
                "key" : "M",
                "doc_count" : 251,
                "average_balance" : {
                  "value" : 24288.239043824702
                }
              }
            ]
          }
        },
        {
          "key" : "40.0-50.0",
          "from" : 40.0,
          "to" : 50.0,
          "doc_count" : 45,
          "group_by_gender" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "M",
                "doc_count" : 24,
                "average_balance" : {
                  "value" : 26474.958333333332
                }
              },
              {
                "key" : "F",
                "doc_count" : 21,
                "average_balance" : {
                  "value" : 27992.571428571428
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```

还有很多其他的聚合操作，下面不再赘述。如果想要进一步的学习，[aggregations reference guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)是一个非常好的资料。


