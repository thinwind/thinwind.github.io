---
layout: post
title:  "ES系列之一入门"
date:   2016-12-26 23:00:00 +0800
categories: [java, elasticsearch]
---


#### ES系列之一入门

Elasticsearch is a highly scalable open-source full-text search and analytics engine. It allows you to store, search, and analyze big volumes of data quickly and in near real time. It is generally used as the underlying engine/technology that powers applications that have complex search features and requirements.



Elasticsearch适用于以下几种场景：     

* 在线商城，允许用户检索商品。这种情况下，可以使用ES存储所有产品分类和库存，提供检索和自动补全的功能。
* 收集日志和业务数据，并对这些数据进行分析来进行趋势预估、统计、数据汇总或者异常分析。这种情况下可以使用Logstash（Elasticsearch/Logstash/Kibana技术栈的一部分）来收集、聚合和分析数据，然后通过Logstash将数据传送到Elasticsearch。一旦数据存储到Elasticsearch，就可以进行检索和聚合来发掘感兴趣的数据。
* 价格通知系统，允许用户定制类似“我想买这货，下个月不管谁价格低于5毛就通知我”之类的功能。这种情况可以抓取各家价格，推进Elasticsearch，使用反向检索（reverse-search）功能来匹配价格变动与用户需要，发现满足要求时就发送通知。
* 分析/智能商业应用需要快速调研、分析、可视化和点对点问答（基于百万甚至数十亿记录）。这种情况下，可以Elasticsearch 存储数据，然后用Kibana（Elasticsearch/Logstash/Kibana技术栈的一部分）来构建定制化面板来展示有重要影响的数据。更近一步，可以用Elasticsearch聚合功能来对数据进行复杂的智能业务分析。


