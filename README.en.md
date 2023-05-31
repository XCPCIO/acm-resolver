# acm-resolver

**[\[中文文档\]](README.md)**

Forked from [hiho-resolver](https://github.com/hiho-coder/hiho-resolver).
Did some performance optimization, changed the color scheme and added a lot of documents.

It's used for visualizing the final hidden stage(aka frozen time) in the competitive programming contest.

## Screenshot

![screenshot](screenshots/shot1.gif)

## Quick Start

```bash
pnpm install
pnpm run start
```

### Load Data

![](screenshots/tutorial_load_data.png)

Enter a url address in the input box or paste the entire JSON content directly into the input box and click 「加载数据」.

### Preview

To see the demo, you can click on 「加载示例数据」.

preview url:

* <https://acm-resolver.xcpcio.com/>
* <https://xcpcio.github.io/acm-resolver/>

### Operation

Just keep pushing the right-arrow key.

### DOMjudge

You can use [Dup4/domjudge-utility](https://github.com/Dup4/domjudge-utility/tree/main/cmd/dump) to export the data in DOMjudge to the data format required by acm-resolver.

Configuration reference for `dump`:

```yaml
base_url: "https://localhost/domjudge/"
userpwd: "username:password"

cid: 1
saved_dir: "./output/1"

exported_data:
  resolver_data: true
```

Then refer to [Load Data](#Load-Data) to load the data in.

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

The format of the `solution`, the key can be arbitrary and the problem subscript starts from 1.

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

The format of the `user`, where the key is the id of the user, should be matched to the solution:

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
