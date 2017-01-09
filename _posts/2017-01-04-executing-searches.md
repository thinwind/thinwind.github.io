---
layout: post
title:  "ES系列之八探索你的数据(三)"
date:   2017-1-4 21:17:00 +0800
categories: [java, elasticsearch]
---

*原文地址   https://www.elastic.co/guide/en/elasticsearch/reference/current/_executing_searches.html*



#### 进行检索

到现在为止已经看过几个基础的检索参数，下面更深入的了解查询DSL。首先看一下返回结果文档的属性。默认情况下，JSON文档全文作为结果一部分被返回。这个文档被称为源文档（通过hits中的`_source`属性获取）。如果不需要返回源文档全文，可以只获取一部分属性。

下面的示例演示只返回`account_number`和`balance`（作为`_source`的一部分）两个属性：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} },
  "_source": ["account_number", "balance"]
}'
```

结果：

```javascript
{
  "took" : 67,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1000,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "25",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 25,
          "balance" : 40540
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "44",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 44,
          "balance" : 34487
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "99",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 99,
          "balance" : 47159
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "119",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 119,
          "balance" : 49222
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "126",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 126,
          "balance" : 3607
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "145",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 145,
          "balance" : 47406
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "183",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 183,
          "balance" : 14223
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "190",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 190,
          "balance" : 3150
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "208",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 208,
          "balance" : 40760
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "222",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 222,
          "balance" : 14764
        }
      }
    ]
  }
}
➜  es >....
        "_type" : "account",
        "_id" : "190",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 190,
          "balance" : 3150
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "208",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 208,
          "balance" : 40760
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "222",
        "_score" : 1.0,

cursh cursh>
➜  es clear

➜  es curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match_all": {} },
  "_source": ["account_number", "balance"]
}'

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
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "25",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 25,
          "balance" : 40540
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "44",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 44,
          "balance" : 34487
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "99",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 99,
          "balance" : 47159
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "119",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 119,
          "balance" : 49222
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "126",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 126,
          "balance" : 3607
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "145",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 145,
          "balance" : 47406
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "183",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 183,
          "balance" : 14223
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "190",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 190,
          "balance" : 3150
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "208",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 208,
          "balance" : 40760
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "222",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 222,
          "balance" : 14764
        }
      }
    ]
  }
}
```

可以看到上面的结果只是简单的减少了`_source`的属性。检索的结果仍然只用`_source`字段来表示源数据，但是这次只包含`account_number`和`balance`两个属性。

如果你有SQL的背景，上面的检索在某种程度上很类似`SQL SELECT FROM` 列名。

继续看查询部分。之前我们已经看到`match_all`查询用来进行匹配所有文档。下面介绍一个新的查询称为`match`查询，可以认为这种查询是基于属性的一种查询方式（例如在某个或者某些属性中进行匹配）。

下面的示例返回`account_number`为20的文档：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match": { "account_number": 20 } }
}'
```

结果：

```javascript
{
  "took" : 16,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "20",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 20,
          "balance" : 16418,
          "firstname" : "Elinor",
          "lastname" : "Ratliff",
          "age" : 36,
          "gender" : "M",
          "address" : "282 Kings Place",
          "employer" : "Scentric",
          "email" : "elinorratliff@scentric.com",
          "city" : "Ribera",
          "state" : "WA"
        }
      }
    ]
  }
}
```

下面的示例返回address中包含"mill"的账号：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match": { "address": "mill" } }
}'
```

结果：

```javascript
{
  "took" : 86,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 4,
    "max_score" : 4.3100996,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "472",
        "_score" : 4.3100996,
        "_source" : {
          "account_number" : 472,
          "balance" : 25571,
          "firstname" : "Lee",
          "lastname" : "Long",
          "age" : 32,
          "gender" : "F",
          "address" : "288 Mill Street",
          "employer" : "Comverges",
          "email" : "leelong@comverges.com",
          "city" : "Movico",
          "state" : "MT"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "136",
        "_score" : 4.2662063,
        "_source" : {
          "account_number" : 136,
          "balance" : 45801,
          "firstname" : "Winnie",
          "lastname" : "Holland",
          "age" : 38,
          "gender" : "M",
          "address" : "198 Mill Lane",
          "employer" : "Neteria",
          "email" : "winnieholland@neteria.com",
          "city" : "Urie",
          "state" : "IL"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "345",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 345,
          "balance" : 9812,
          "firstname" : "Parker",
          "lastname" : "Hines",
          "age" : 38,
          "gender" : "M",
          "address" : "715 Mill Avenue",
          "employer" : "Baluba",
          "email" : "parkerhines@baluba.com",
          "city" : "Blackgum",
          "state" : "KY"
        }
      }
    ]
  }
}
```

下面的示例返回地址包含"mill"或者"lane"的账号：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": { "match": { "address": "mill lane" } }
}'
```

结果：

```javascript
{
  "took" : 16,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 19,
    "max_score" : 7.3900023,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "136",
        "_score" : 7.3900023,
        "_source" : {
          "account_number" : 136,
          "balance" : 45801,
          "firstname" : "Winnie",
          "lastname" : "Holland",
          "age" : 38,
          "gender" : "M",
          "address" : "198 Mill Lane",
          "employer" : "Neteria",
          "email" : "winnieholland@neteria.com",
          "city" : "Urie",
          "state" : "IL"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "472",
        "_score" : 4.3100996,
        "_source" : {
          "account_number" : 472,
          "balance" : 25571,
          "firstname" : "Lee",
          "lastname" : "Long",
          "age" : 32,
          "gender" : "F",
          "address" : "288 Mill Street",
          "employer" : "Comverges",
          "email" : "leelong@comverges.com",
          "city" : "Movico",
          "state" : "MT"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "556",
        "_score" : 3.9074605,
        "_source" : {
          "account_number" : 556,
          "balance" : 36420,
          "firstname" : "Collier",
          "lastname" : "Odonnell",
          "age" : 35,
          "gender" : "M",
          "address" : "591 Nolans Lane",
          "employer" : "Sultraxin",
          "email" : "collierodonnell@sultraxin.com",
          "city" : "Fulford",
          "state" : "MD"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "934",
        "_score" : 3.9074605,
        "_source" : {
          "account_number" : 934,
          "balance" : 43987,
          "firstname" : "Freida",
          "lastname" : "Daniels",
          "age" : 34,
          "gender" : "M",
          "address" : "448 Cove Lane",
          "employer" : "Vurbo",
          "email" : "freidadaniels@vurbo.com",
          "city" : "Snelling",
          "state" : "NJ"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "345",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 345,
          "balance" : 9812,
          "firstname" : "Parker",
          "lastname" : "Hines",
          "age" : 38,
          "gender" : "M",
          "address" : "715 Mill Avenue",
          "employer" : "Baluba",
          "email" : "parkerhines@baluba.com",
          "city" : "Blackgum",
          "state" : "KY"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "908",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 908,
          "balance" : 45975,
          "firstname" : "Mosley",
          "lastname" : "Holloway",
          "age" : 31,
          "gender" : "M",
          "address" : "929 Eldert Lane",
          "employer" : "Anivet",
          "email" : "mosleyholloway@anivet.com",
          "city" : "Biehle",
          "state" : "MS"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "637",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 637,
          "balance" : 3169,
          "firstname" : "Kathy",
          "lastname" : "Carter",
          "age" : 27,
          "gender" : "F",
          "address" : "410 Jamison Lane",
          "employer" : "Limage",
          "email" : "kathycarter@limage.com",
          "city" : "Ernstville",
          "state" : "WA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "449",
        "_score" : 3.8473392,
        "_source" : {
          "account_number" : 449,
          "balance" : 41950,
          "firstname" : "Barnett",
          "lastname" : "Cantrell",
          "age" : 39,
          "gender" : "F",
          "address" : "945 Bedell Lane",
          "employer" : "Zentility",
          "email" : "barnettcantrell@zentility.com",
          "city" : "Swartzville",
          "state" : "ND"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "742",
        "_score" : 3.8473392,
        "_source" : {
          "account_number" : 742,
          "balance" : 24765,
          "firstname" : "Merle",
          "lastname" : "Wooten",
          "age" : 26,
          "gender" : "M",
          "address" : "317 Pooles Lane",
          "employer" : "Tropolis",
          "email" : "merlewooten@tropolis.com",
          "city" : "Bentley",
          "state" : "ND"
        }
      }
    ]
  }
}
```

接下来介绍`bool(ean)`查询。`bool`查询可以使用布尔逻辑将小的查询整合为更大的查询。

下面的示例整合了两个`match`查询，返回所有地址包含`mill`和`lane`的账号：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}'
```

结果：

```javascript
{
  "took" : 11,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 7.3900023,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "136",
        "_score" : 7.3900023,
        "_source" : {
          "account_number" : 136,
          "balance" : 45801,
          "firstname" : "Winnie",
          "lastname" : "Holland",
          "age" : 38,
          "gender" : "M",
          "address" : "198 Mill Lane",
          "employer" : "Neteria",
          "email" : "winnieholland@neteria.com",
          "city" : "Urie",
          "state" : "IL"
        }
      }
    ]
  }
}
```

上面的示例中，`bool must`子句表明所有的查询条件都必须全部满足的文档才可以包含到结果中。

与此不同，下面的例子组合两个`match`查询，返回地址包含`mill`或者`lane`的所有账号：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": {
    "bool": {
      "should": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}'
```

结果：

```javascript
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 19,
    "max_score" : 7.3900023,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "136",
        "_score" : 7.3900023,
        "_source" : {
          "account_number" : 136,
          "balance" : 45801,
          "firstname" : "Winnie",
          "lastname" : "Holland",
          "age" : 38,
          "gender" : "M",
          "address" : "198 Mill Lane",
          "employer" : "Neteria",
          "email" : "winnieholland@neteria.com",
          "city" : "Urie",
          "state" : "IL"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "472",
        "_score" : 4.3100996,
        "_source" : {
          "account_number" : 472,
          "balance" : 25571,
          "firstname" : "Lee",
          "lastname" : "Long",
          "age" : 32,
          "gender" : "F",
          "address" : "288 Mill Street",
          "employer" : "Comverges",
          "email" : "leelong@comverges.com",
          "city" : "Movico",
          "state" : "MT"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "556",
        "_score" : 3.9074605,
        "_source" : {
          "account_number" : 556,
          "balance" : 36420,
          "firstname" : "Collier",
          "lastname" : "Odonnell",
          "age" : 35,
          "gender" : "M",
          "address" : "591 Nolans Lane",
          "employer" : "Sultraxin",
          "email" : "collierodonnell@sultraxin.com",
          "city" : "Fulford",
          "state" : "MD"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "934",
        "_score" : 3.9074605,
        "_source" : {
          "account_number" : 934,
          "balance" : 43987,
          "firstname" : "Freida",
          "lastname" : "Daniels",
          "age" : 34,
          "gender" : "M",
          "address" : "448 Cove Lane",
          "employer" : "Vurbo",
          "email" : "freidadaniels@vurbo.com",
          "city" : "Snelling",
          "state" : "NJ"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "345",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 345,
          "balance" : 9812,
          "firstname" : "Parker",
          "lastname" : "Hines",
          "age" : 38,
          "gender" : "M",
          "address" : "715 Mill Avenue",
          "employer" : "Baluba",
          "email" : "parkerhines@baluba.com",
          "city" : "Blackgum",
          "state" : "KY"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "908",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 908,
          "balance" : 45975,
          "firstname" : "Mosley",
          "lastname" : "Holloway",
          "age" : 31,
          "gender" : "M",
          "address" : "929 Eldert Lane",
          "employer" : "Anivet",
          "email" : "mosleyholloway@anivet.com",
          "city" : "Biehle",
          "state" : "MS"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "637",
        "_score" : 3.861861,
        "_source" : {
          "account_number" : 637,
          "balance" : 3169,
          "firstname" : "Kathy",
          "lastname" : "Carter",
          "age" : 27,
          "gender" : "F",
          "address" : "410 Jamison Lane",
          "employer" : "Limage",
          "email" : "kathycarter@limage.com",
          "city" : "Ernstville",
          "state" : "WA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "449",
        "_score" : 3.8473392,
        "_source" : {
          "account_number" : 449,
          "balance" : 41950,
          "firstname" : "Barnett",
          "lastname" : "Cantrell",
          "age" : 39,
          "gender" : "F",
          "address" : "945 Bedell Lane",
          "employer" : "Zentility",
          "email" : "barnettcantrell@zentility.com",
          "city" : "Swartzville",
          "state" : "ND"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "742",
        "_score" : 3.8473392,
        "_source" : {
          "account_number" : 742,
          "balance" : 24765,
          "firstname" : "Merle",
          "lastname" : "Wooten",
          "age" : 26,
          "gender" : "M",
          "address" : "317 Pooles Lane",
          "employer" : "Tropolis",
          "email" : "merlewooten@tropolis.com",
          "city" : "Bentley",
          "state" : "ND"
        }
      }
    ]
  }
}
```

上面的例子中，`bool should`子句表明查询条件中只要文档符合一条即可包含到结果中。

下面的例子由2个`match`查询组成，查询的结果地址既不包括"mill"也不包含"lane"：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must_not": [
        { "match": { "address": "mill" } },
        { "match": { "address": "lane" } }
      ]
    }
  }
}'
```

结果：

```javascript
{
  "took" : 9,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 981,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "25",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 25,
          "balance" : 40540,
          "firstname" : "Virginia",
          "lastname" : "Ayala",
          "age" : 39,
          "gender" : "F",
          "address" : "171 Putnam Avenue",
          "employer" : "Filodyne",
          "email" : "virginiaayala@filodyne.com",
          "city" : "Nicholson",
          "state" : "PA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "44",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 44,
          "balance" : 34487,
          "firstname" : "Aurelia",
          "lastname" : "Harding",
          "age" : 37,
          "gender" : "M",
          "address" : "502 Baycliff Terrace",
          "employer" : "Orbalix",
          "email" : "aureliaharding@orbalix.com",
          "city" : "Yardville",
          "state" : "DE"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "99",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 99,
          "balance" : 47159,
          "firstname" : "Ratliff",
          "lastname" : "Heath",
          "age" : 39,
          "gender" : "F",
          "address" : "806 Rockwell Place",
          "employer" : "Zappix",
          "email" : "ratliffheath@zappix.com",
          "city" : "Shaft",
          "state" : "ND"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "119",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 119,
          "balance" : 49222,
          "firstname" : "Laverne",
          "lastname" : "Johnson",
          "age" : 28,
          "gender" : "F",
          "address" : "302 Howard Place",
          "employer" : "Senmei",
          "email" : "lavernejohnson@senmei.com",
          "city" : "Herlong",
          "state" : "DC"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "126",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 126,
          "balance" : 3607,
          "firstname" : "Effie",
          "lastname" : "Gates",
          "age" : 39,
          "gender" : "F",
          "address" : "620 National Drive",
          "employer" : "Digitalus",
          "email" : "effiegates@digitalus.com",
          "city" : "Blodgett",
          "state" : "MD"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "145",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 145,
          "balance" : 47406,
          "firstname" : "Rowena",
          "lastname" : "Wilkinson",
          "age" : 32,
          "gender" : "M",
          "address" : "891 Elton Street",
          "employer" : "Asimiline",
          "email" : "rowenawilkinson@asimiline.com",
          "city" : "Ripley",
          "state" : "NH"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "183",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 183,
          "balance" : 14223,
          "firstname" : "Hudson",
          "lastname" : "English",
          "age" : 26,
          "gender" : "F",
          "address" : "823 Herkimer Place",
          "employer" : "Xinware",
          "email" : "hudsonenglish@xinware.com",
          "city" : "Robbins",
          "state" : "ND"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "190",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 190,
          "balance" : 3150,
          "firstname" : "Blake",
          "lastname" : "Davidson",
          "age" : 30,
          "gender" : "F",
          "address" : "636 Diamond Street",
          "employer" : "Quantasis",
          "email" : "blakedavidson@quantasis.com",
          "city" : "Crumpler",
          "state" : "KY"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "208",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 208,
          "balance" : 40760,
          "firstname" : "Garcia",
          "lastname" : "Hess",
          "age" : 26,
          "gender" : "F",
          "address" : "810 Nostrand Avenue",
          "employer" : "Quiltigen",
          "email" : "garciahess@quiltigen.com",
          "city" : "Brooktrails",
          "state" : "GA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "222",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 222,
          "balance" : 14764,
          "firstname" : "Rachelle",
          "lastname" : "Rice",
          "age" : 36,
          "gender" : "M",
          "address" : "333 Narrows Avenue",
          "employer" : "Enaut",
          "email" : "rachellerice@enaut.com",
          "city" : "Wright",
          "state" : "AZ"
        }
      }
    ]
  }
}
```

上面的例子中，`bool must_not`子句表明所有的查询条件都不满足的文档才会被包含到结果中。

在一个`bool`查询中可以将`must`、`should`、`must_not`组合使用。更进一步，在`bool`子句中可以嵌套`bool`查询来构建任意复杂度的多级逻辑查询。

下面的例子返回所有年龄为40岁但是不住在ID(aho)州的所有的人：

```bash
curl -XGET 'localhost:9200/bank/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}'
```

结果：

```javascript
{
  "took" : 16,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 43,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "948",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 948,
          "balance" : 37074,
          "firstname" : "Sargent",
          "lastname" : "Powers",
          "age" : 40,
          "gender" : "M",
          "address" : "532 Fiske Place",
          "employer" : "Accuprint",
          "email" : "sargentpowers@accuprint.com",
          "city" : "Umapine",
          "state" : "AK"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "40",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 40,
          "balance" : 33882,
          "firstname" : "Pace",
          "lastname" : "Molina",
          "age" : 40,
          "gender" : "M",
          "address" : "263 Ovington Court",
          "employer" : "Cytrak",
          "email" : "pacemolina@cytrak.com",
          "city" : "Silkworth",
          "state" : "OR"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "468",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 468,
          "balance" : 18400,
          "firstname" : "Foreman",
          "lastname" : "Fowler",
          "age" : 40,
          "gender" : "M",
          "address" : "443 Jackson Court",
          "employer" : "Zillactic",
          "email" : "foremanfowler@zillactic.com",
          "city" : "Wakarusa",
          "state" : "WA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "792",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 792,
          "balance" : 13109,
          "firstname" : "Becky",
          "lastname" : "Jimenez",
          "age" : 40,
          "gender" : "F",
          "address" : "539 Front Street",
          "employer" : "Isologia",
          "email" : "beckyjimenez@isologia.com",
          "city" : "Summertown",
          "state" : "MI"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "302",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 302,
          "balance" : 11298,
          "firstname" : "Isabella",
          "lastname" : "Hewitt",
          "age" : 40,
          "gender" : "M",
          "address" : "455 Bedford Avenue",
          "employer" : "Cincyr",
          "email" : "isabellahewitt@cincyr.com",
          "city" : "Blanford",
          "state" : "IN"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "340",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 340,
          "balance" : 42072,
          "firstname" : "Juarez",
          "lastname" : "Gutierrez",
          "age" : 40,
          "gender" : "F",
          "address" : "802 Seba Avenue",
          "employer" : "Billmed",
          "email" : "juarezgutierrez@billmed.com",
          "city" : "Malott",
          "state" : "OH"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "485",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 485,
          "balance" : 44235,
          "firstname" : "Albert",
          "lastname" : "Roberts",
          "age" : 40,
          "gender" : "M",
          "address" : "385 Harman Street",
          "employer" : "Stralum",
          "email" : "albertroberts@stralum.com",
          "city" : "Watrous",
          "state" : "NM"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "666",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 666,
          "balance" : 13880,
          "firstname" : "Mcguire",
          "lastname" : "Lloyd",
          "age" : 40,
          "gender" : "F",
          "address" : "658 Just Court",
          "employer" : "Centrexin",
          "email" : "mcguirelloyd@centrexin.com",
          "city" : "Warren",
          "state" : "MT"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "998",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 998,
          "balance" : 16869,
          "firstname" : "Letha",
          "lastname" : "Baker",
          "age" : 40,
          "gender" : "F",
          "address" : "206 Llama Court",
          "employer" : "Dognosis",
          "email" : "lethabaker@dognosis.com",
          "city" : "Dunlo",
          "state" : "WV"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "432",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 432,
          "balance" : 28969,
          "firstname" : "Preston",
          "lastname" : "Ferguson",
          "age" : 40,
          "gender" : "F",
          "address" : "239 Greenwood Avenue",
          "employer" : "Bitendrex",
          "email" : "prestonferguson@bitendrex.com",
          "city" : "Idledale",
          "state" : "ND"
        }
      }
    ]
  }
}
```


