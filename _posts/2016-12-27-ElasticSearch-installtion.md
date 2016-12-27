---
layout: post
title:  "ES系列之三安装"
date:   2016-12-27 23:52:00 +0800
categories: [java, elasticsearch]
---

*原文地址  https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html*




#### 安装

Elasticsearch要求Java最低版本为8.当编写此文时，推荐安装Oracle JDK 1.8.0_73.Java的安装跟平台有关，这里不在赘述，需要的自己去百度吧。顺便奉上官方安装指南：[Oracle Java Install Guides](http://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html).最后说一下，安装Elasticsearch前一定要查看一下当前系统的Java版本（如果必要请自行安装或者升级）：    

```bash
java -version
echo $JAVA_HOME
```

安装完成以后，到官网下载Elasticsearch，版本信息如果不想看英语说明就自己百度吧。官网下载地址：[www.elastic.co/downloads](http://www.elastic.co/downloads).这里可以找到各个历史版本，并且每个版本都提供多种安装包。下面假定你下载好了自己需要的安装包，并解压到elasticsearch-5.1.1目录。（不会下载不会解压还不会用百度的小伙伴可以考虑转行了，安装包的可以原谅）
下面继续：

```bash
cd elasticsearch-5.1.1/bin
```

接下来就可以启动这个节点了（win系小伙伴需要用.bat文件）

```
./elasticsearh
```

如果一切正常，可以在控制台看到类似下面的输出信息：

```bash
[2016-12-28T00:11:39,665][INFO ][o.e.n.Node               ] [] initializing ...
[2016-12-28T00:11:39,748][INFO ][o.e.e.NodeEnvironment    ] [6CTEdF4] using [1] data paths, mounts [[/ (/dev/disk1)]], net usable_space [205.2gb], net total_space [464.7gb], spins? [unknown], types [hfs]
[2016-12-28T00:11:39,748][INFO ][o.e.e.NodeEnvironment    ] [6CTEdF4] heap size [1.9gb], compressed ordinary object pointers [true]
[2016-12-28T00:11:39,749][INFO ][o.e.n.Node               ] node name [6CTEdF4] derived from node ID [6CTEdF43T9qf1S4twnZTkQ]; set [node.name] to override
[2016-12-28T00:11:39,753][INFO ][o.e.n.Node               ] version[5.1.1], pid[1145], build[5395e21/2016-12-06T12:36:15.409Z], OS[Mac OS X/10.12.2/x86_64], JVM[Oracle Corporation/Java HotSpot(TM) 64-Bit Server VM/1.8.0_111/25.111-b14]
[2016-12-28T00:11:40,674][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [aggs-matrix-stats]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [ingest-common]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [lang-expression]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [lang-groovy]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [lang-mustache]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [lang-painless]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [percolator]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [reindex]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [transport-netty3]
[2016-12-28T00:11:40,675][INFO ][o.e.p.PluginsService     ] [6CTEdF4] loaded module [transport-netty4]
[2016-12-28T00:11:40,676][INFO ][o.e.p.PluginsService     ] [6CTEdF4] no plugins loaded
[2016-12-28T00:11:42,985][INFO ][o.e.n.Node               ] initialized
[2016-12-28T00:11:42,992][INFO ][o.e.n.Node               ] [6CTEdF4] starting ...
[2016-12-28T00:11:48,226][INFO ][o.e.t.TransportService   ] [6CTEdF4] publish_address {127.0.0.1:9300}, bound_addresses {[fe80::1]:9300}, {[::1]:9300}, {127.0.0.1:9300}
[2016-12-28T00:11:51,305][INFO ][o.e.c.s.ClusterService   ] [6CTEdF4] new_master {6CTEdF4}{6CTEdF43T9qf1S4twnZTkQ}{uXuhZZqVSxyiredYcNohXw}{127.0.0.1}{127.0.0.1:9300}, reason: zen-disco-elected-as-master ([0] nodes joined)
[2016-12-28T00:11:51,348][INFO ][o.e.h.HttpServer         ] [6CTEdF4] publish_address {127.0.0.1:9200}, bound_addresses {[fe80::1]:9200}, {[::1]:9200}, {127.0.0.1:9200}
[2016-12-28T00:11:51,348][INFO ][o.e.n.Node               ] [6CTEdF4] started
[2016-12-28T00:11:51,349][INFO ][o.e.g.GatewayService     ] [6CTEdF4] recovered [0] indices into cluster_state
```

暂时不过多关注这些信息的细节，可以看到名为“6CTEdF4”的节点（你看到的可能会不同）已经启动起来，并且将自己推选为master节点，加入到一个簇中。先不用管mater的含义，当前最重要的是我们启动了一个包含单节点的簇。

正如之前所说，可以指定簇和节点的名字。可以用下面的命令实现：

```bash
./elasticsearch -Ecluster.name=my_cluster_name -Enode.name=my_node_name
```

同时要记住带有http的信息，包括地址（`127.0.0.1`）和端口（`9200`），稍后我们将通过这些信息进行连接。Elasticsearch默认通过`9200`端口提供REST API。端口可以配置。

