**[\[中文文档\]](README.md)**

Forked from [hiho-resolver](https://github.com/hiho-coder/hiho-resolver).
Did some performance optimization, changed the color scheme and added a lot of documents.

It's used for visualizing the final hidden stage(aka frozen time) in the competitive programming contest.

# Screenshot

![screenshot](screenshots/shot1.gif)

# Quick Start

## 1. Prepare Data

The code of reading data is the end of `js/main.js`, `$.getJSON("contest.json", function(data){..})`

It reads the `contest.json` in the root folder by default.

### JSON Format

```
{
  problem_count: 10,
  solutions: {... },
  users: {... }
}
```

For solution's format，you can use arbitrary keys，problem is indexed from 1.

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

For user's format，the key is `user_id`，should be matched with what in solutions：

```
1: {
  name: "TEAM1",
  college: "HZNU",
  is_exclude: true
},
2: {
  name: "TEAM2",
  college: "HDU",
  is_exclude: false
},
3: {
  name: "TEAM3",
  college: "PKU",
  is_exclude: true
},
```

## 2. Frozen Time Configuration

The frozen time is 3600\*2s by default (2 hours before the contest ends. The default data is a warming-up contest which only last 3 hours).
You can change this in the begging of `hiho-resolver.js`.

```javascript
function Resolver(solutions, users, problem_count){
	this.solutions = solutions;
	this.users = users;
	this.problem_count = problem_count;
	this.frozen_seconds = 3600*2; // HERE!
	this.operations = [];
}
```

## 2. Prepare a Web Server

1. The page must be visited using HTTP protocol. So you should prepare a web server.
2. Put this project in the root path of your web server. And visit `index.html`.

## 3. Run It

Just keep pushing the right-arrow key.

**If you changed the input data. Please clear the browser cache and refresh the page.**

