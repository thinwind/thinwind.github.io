---
layout: post
title:  "pip自动更新所有过时库"
date:   2016-12-25 02:14:45 +0800
categories: [python, shell]
---

##### 问题：pip没有自动全部更新的指令

pip没有提供自动更新所有过时库的指令，开发机器有时候会需要跟进所有更新，这个时候可以考虑用shell脚本实现。



正常情况下，更新pip库的步骤是：
1.先用命令`pip3 list --outdated --format=columns`(旧版本的pip请使用`pip3 list --outdated`)查看有哪些库有可用更新。
```bash         
Package    Version Latest Type      
---------- ------- ------ -----         
Django     1.10.3  1.10.4 wheel         
requests   2.12.2  2.12.3 wheel         
Scrapy     1.2.1   1.2.2  wheel         
setuptools 29.0.1  30.3.0 wheel         
```

2.使用`pip3 install --upgrade Django` 来更新Django库。

3.重复步骤2，直到更新所有库。

#####  目标：用脚本自动全部更新

用脚本自动查找有可用更新的库，然后自动进行更新

#####  方案：用sh脚本实现

            
* 1 先用`pip3 list --outdated --format=columns` 获取所有可更新库
* 2 将这些数据传递给sed，利用sed截取第3行到最后一行,`sed -n '3,$p'` 
* 3 截取每行的第一个字段，获取库的名称，`sed -n '3,$p'`
* 4 将库名保存到变量,`read framework`
* 5 执行更新,`pip3 install --upgrade $framework`
* 6 循环步骤4、5，直到所有更新完成

#####  代码：最后成果

```bash
pip3 list --outdated --format=columns |
    sed -n '3,$p' |
    cut -d ' ' -f 1 |
    while read framework 
    do
        pip3 install --upgrade $framework
    done
```

#####  注意：pip版本问题

pip版本不同，可能输出的可用更新格式不一样，按照以上思路，自己适当调整即可。

#####  其它参考方式

如果不用读取变量也可以，使用替换然后sh执行，脚本如下：

```bash
pip3 list --outdated --format=columns |
    sed -n '3,$p' |
    cut -d ' ' -f 1 |
    sed 's/^/pip3 install --upgrade /' |
    sh -x
```