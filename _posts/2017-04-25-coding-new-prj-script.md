---
layout: post
title:  "coding批量生成项目脚本"
date:   2017-04-25 00:00:00 +0800
categories: [javascript]
---

coding官网地址： https://coding.net

##### 请大家在资金允许的情况下尽量付费支持一下他们

coding免费用户创建private项目的数量是有很大限制的。前几天coding做活动，送了两个月的黄金会员，可以创建100个private项目。为了充分利用这个活动机会，先创建100个私有项目占坑，以后用的时候再具体设置。






##### 先创建项目的可行性
从官网的FAQ了解到，这样做是可行的,链接在这里--> https://coding.net/u/coding/p/Coding-Feedback/topic/333298

> Q：我现在有 50 个项目，不想付费，这些项目会怎么办？会像 Github 一样完全不可用吗？<br>
> A：不会。现有项目遵循只能减不能增的原则。已经创建的项目，在不超出项目容量限制的前提下，使用上没有任何区别。

> Q：容量限制是指单个项目的容量还是所有项目的累积容量？<br>
> A：单个项目容量。

> Q:会员到期后，超出了会员等级限制的私有项目或团队项目支持更改项目名称么？<br>
> A:这个是可以的，没有这个限制

所以，先创建100个项目的想法是完全可行滴～～～

#### 开始创建

如果你时间充足，并且实在坐着无聊，可以用手动创建。正常情况下，一分钟妥妥的可以创建三个项目

1. 进入coding，先登陆成功

登陆是必须的，因为创建项目的前提是登陆

2. 打开浏览器控制台

推荐使用`chrome`,打开控制台的方式，请自行解决

3. 先定义ajax请求的方法

没有分析所有coding的js脚本，估计应该有ajax的请求封装。但是为了这点儿小事去分析一大堆压缩的js，实在得不偿失，所以自己定义一个好了。
在控制台输入下面的代码:

```

function ajax(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
    }

```

4. 定义自动生成项目的方法

如果想知道这个方法的来历，可以自己监控一下coding在生成项目时的网络请求。不得不说，coding的请求参数很简单，很容易分析，简直良心佳作。向开发人员致敬！

```

function createPrj(start,count) {
    var prjName = 'myprj' + start;
    if (count>0) {
        ajax({
            method: 'POST',
            url: 'https://coding.net/api/project',
            data: {
                type: 2,
                gitEnabled: true,
                gitReadmeEnabled: false,
                gitIgnore: 'no',
                gitLicense: 'no',
                vcsType: 'git',
                name: prjName,
                teamGK: '<这里填你的用户名>'
            },
            success: function (response) {
                console.log(response);
            }
        });
        start=start+1;
        count=count-1;
        setTimeout("createPrj("+start+","+count+")", 3000);
    }
}

```

5. 生成项目

从4中定义的方法，可以看到，项目名称是`myprj`开头，后面跟一个数字来生成的，如果不想用这个名字，请自行更换

比如要生成90个项目，项目名称分别为`myprj1`,`myprj2`,`myprj3`,...,`myprj90`,在控制台输入:

```
createPrj(1,90)
```

等几分钟，大功告成

6. 补充一点儿

随着coding产品的不断发展，也许在你看到的时候创建项目方式已经改变，这个脚本会无法使用，这属于正常情况。如果有能力，请支持一下他们的产品。