---
layout: post
title:  "Adf应用部署到GlassFish"
date:   2017-04-01 00:00:00 +0800
categories: [java]
---

Oracle ADF官网地址: http://www.oracle.com/technetwork/cn/developer-tools/adf/overview/index-097465-zhs.html

Oracle ADF是一个端到端的Java EE框架，它通过提供现成的基础架构服务以及可视的、声明式开发体验简化了应用程序开发。

GlassFish官网地址: https://javaee.github.io/glassfish/

GlassFish是一款强健的商业兼容应用服务器，达到产品级质量，可免费用于开发、部署和重新分发。开发者可以免费获得源代码，还可以对代码进行更改。     





      

##### 版本说明
     
     
| 工具 | 版本 | 下载地址 | 
| ---- | ----- | ----- | 
| Adf & Jdeveloper | 12.2.1.2.0 | http://www.oracle.com/technetwork/developer-tools/jdev/downloads/index.html | 
| GlassFish	| 4.1.1-Full Platform	|  https://glassfish.java.net/download.html | 
| Adf-essentials	 | 12.2.1.2	 | http://www.oracle.com/technetwork/developer-tools/adf/downloads/index.html | 


#### 配置GlassFish

1. 解压Adf-essentials，将所有的jar文件放到 `path-to-glassfish/glassfish/domains/domain1/lib`

  *注意* :

  * 官网文档描述时解压到lib/applibs，据实测不可行。详细描述可参考 https://community.oracle.com/message/14061462
  * 解压Adf-essentials时，使用`unzip -j adf-essentials.zip -d <dir>`，解压的时候不带目录结构。拷贝的时候只拷jar文件，不要带目录结构，最终结果如下图
   ![](/static/img/lib-jars.png)


2. 配置jvm参数

   打开浏览器，进入Administration Console界面，按照下面参数配置

   ```
    JVM缓存：-Doracle.mds.cache=simple
    最大Perm区内存：-XX:MaxPermSize=512m
    最大JVM内存：-Xmx2048m
   ```

   ![](/static/img/2-1.png)

   ![](/static/img/a2g-2-2.png)

   ![](/static/img/a2g-2-3.png)


3. 配置数据库连接

   使用资源管理器，进行以下操作
   
   * 找到mysql连接模版，位置在
`path-to-glassfish/glassfish/lib/install/templates/resources/jdbc`
   * 编辑`mysql_type4_datasource.xml`文件，修改为恰当的配置
   ![](/static/img/a2g-3-1.png)

   * (可选操作) 在path-to-glassfish/glassfish/bin目录下执行 asadmin ping-connection-pool <connection-pool-name>测试连接池是否可以正常连接

4. 点开`Administration Console`，查看连接池是否正常

   ![](/static/img/a2g-4-1.png)

5. 查看JDBC资源
   
   ![](/static/img/a2g-5-1.png)

   *注意*
   
   * GlassFish 管理界面直接进行数据库连接的操作目前有bug，直接建立连接会报错
   ![](/static/img/a2g-5-2.png)
   
     ![](/static/img/a2g-5-3.png)
   
   * 目前只使用了模板文件进行配置的方式
   * 按照官网的说明，使用asadmin命令行工具也可以进行连接池和资源的建立，具体请参考：  https://docs.oracle.com/middleware/1212/adf/ADFAG/ap_glassfish.htm#ADFAG20987

6. 修改ADF应用的数据库连接
   
   * 打开JDeveloper
   * 打开项目
   * 找到连接配置管理文件
   
   ![](/static/img/a2g-6-1.png)
   
   ![](/static/img/a2g-6-2.png)

7. 修改ViewController的配置
   
   ![](/static/img/a2g-7-1.png)

   ![](/static/img/a2g-7-2.png)

   ![](/static/img/a2g-7-3.png)

8. 修改Application的部署配置

   ![](/static/img/a2g-8-1.png)

   ![](/static/img/a2g-8-2.png)

   ![](/static/img/a2g-8-3.png)

9. 导出应用
   
   ![](/static/img/a2g-9-1.png)

   ![](/static/img/a2g-9-2.png)

   ![](/static/img/a2g-9-3.png)

10. 将应用部署到GlassFish

   * 打开浏览器，进入GlassFish的`Administration Console`
   
   ![](/static/img/a2g-10-1.png)

   
   * 选择导出的应用文件，进行部署
   
   ![](/static/img/a2g-10-2.png)

   ![](/static/img/a2g-10-3.png)

   ![](/static/img/a2g-10-4.png)

11. 访问应用
   
   * 点击应用名，进入详情编辑页
   
   ![](/static/img/a2g-11-1.png)

   
   * 点击lunch连接
   
   ![](/static/img/a2g-11-2.png)

   
   * 进入链接详情页
   
   ![](/static/img/a2g-11-3.png)

   *注意*：链接的默认地址是本地电脑的名称，需要将此名称换成该电脑对应的ip地址（如果是本机可以使用`localhost`或者`127.0.0.1`）
   
   * 修改为正确的url以后，就可以看到应用界面了
   
   ![](/static/img/a2g-11-4.png)


