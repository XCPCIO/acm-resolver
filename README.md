# acm-resolver

本项目 fork 自 [hiho-resolver](https://github.com/hiho-coder/hiho-resolver)，用于 ACM 系列竞赛的滚榜。
相比原项目，主要优化了动画效率，更改了界面配色，并丰富了文档。

**[\[English Document\]](README.en.md)**

## Screenshot

![screenshot](screenshots/shot1.gif)

## Tutorial

### DOMjudge

可以使用 [Dup4/domjudge-utility](https://github.com/Dup4/domjudge-utility/tree/main/cmd/dump) 将 DOMjudge 中的数据导出成 acm-resolver 所需要的数据格式。

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

![](./screenshots/resolver_domjudge_tutorial.png)

如果不想自己搭建 http 服务器来跑 acm-resolver，可以直接使用 <https://acm-resolver.xcpcio.com/>

### Operation

不停按方向键右即可。

**如果切换了数据源，需要清空浏览器缓存再刷新。**

## JSON Configuration Format

```json
{
    "contest_name": "your contest name",
    "problem_count": 13,
    "frozen_seconds": 3600,
    "solutions": {},
    "users": {}
}
```

solution 的格式，key 可以任意，problem 下标从 1 开始:

```json
{
    "381503": {
        "user_id": "1",
        "problem_index": "1",
        "verdict": "AC",
        "submitted_seconds": 22
    },
    "381504": {
        "user_id": "2",
        "problem_index": "1",
        "verdict": "WA",
        "submitted_seconds": 23
    }
}
```

user 的格式，其中 key 即为 user 的 id，要和 solution 中对上：

```json
{
    "1": {
        "name": "花落人亡两不知",
        "college": "HZNU",
        "is_exclude": true
    },
    "2": {
        "name": "大斌丶凸(♯｀∧´)凸",
        "college": "HDU",
        "is_exclude": false
    },
    "3": {
        "name": "天才少女队",
        "college": "PKU",
        "is_exclude": true
    }
}
```
