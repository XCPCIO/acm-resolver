# acm-resolver

本项目fork自[hiho-resolver](https://github.com/hiho-coder/hiho-resolver)，用于ACM系列竞赛的滚榜。
相比原项目，主要优化了动画效率，更改了界面配色，并丰富了文档。

**[\[English Document\]](README.en.md)**

## Screenshot

![screenshot](screenshots/shot1.gif)

## DOMjudge Tutorial

可以配合 [Dup4/domjudge-utility](https://github.com/Dup4/domjudge-utility/tree/main/cmd/dump) 将 DOMjudge 中的数据导出成 acm-resolver 所需要的数据格式。

dump 的配置参考：

```yaml
base_url: "https://localhost/domjudge/"
userpwd: "username:password"

cid: 1
saved_dir: "./output/1"

exported_data:
  resolver_data: true
```

然后将 output/1 目录下的 resolver.json 中的内容，粘贴到下图中的输入框中，然后点击「加载数据」，记得先点一下「清空缓存」。

![](./screenshots/resolver_tutorial.png)

如果不想自己搭建 http 服务器来跑 acm-resolver，可以直接使用 <https://resolver.xcpcio.com/>

## Basic Tutorial

### 准备数据

数据输入的代码在`js/main.js`的最后，`$.getJSON("contest.json", function(data){..})`

默认是使用根目录下的`contest.json`，可以直接把准备好的数据贴到里面去。

### 搭建服务器

1. 网页必须以http协议访问，准备一个web服务器，Windows推荐用WAMP，MacOS推荐用MAMP。
2. 把整个工程文件拷贝到服务器的目录下，在浏览器中访问index.html即可。

### 操作说明

不停按方向键右即可。

**如果切换了数据源，需要清空浏览器缓存再刷新。**

## 更多配置

封榜的时间默认是3600\*2s（距离比赛开始2小时，用的是一个热身赛的数据，整场比赛只有3小时），在`hiho-resolver.js` 最开头修改

```javascript
function Resolver(solutions, users, problem_count){
	this.solutions = solutions;
	this.users = users;
	this.problem_count = problem_count;
	this.frozen_seconds = 3600*2; // HERE!
	this.operations = [];
}
```

### JSON格式

```
{
  problem_count: 10,
  solutions: {... },
  users: {... }
}
```

solution的格式，key可以任意，problem下标从1开始:

```
381503: {
  user_id: "1",
  problem_index: "1",
  verdict: "AC",
  submitted_seconds: 22
},
381504: {
  user_id: "2",
  problem_index: "1",
  verdict: "WA",
  submitted_seconds: 23
},
```

user的格式，其中key即为user的id，要和solution中对上：

```
1: {
  name: "花落人亡两不知",
  college: "HZNU",
  is_exclude: true
},
2: {
  name: "大斌丶凸(♯｀∧´)凸",
  college: "HDU",
  is_exclude: false
},
3: {
  name: "天才少女队",
  college: "PKU",
  is_exclude: true
},
```
