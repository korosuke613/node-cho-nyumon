# nodeLearn

[Node.js超入門](http://www.shuwasystem.co.jp/products/7980html/5092.html)を参考にnode.jsのお勉強をする。

## やりかた

### ホストでの操作

```bash
cd hogehoge/nodeLearn
docker run -it --rm -v $PWD:/tmp -p 8080:3000 -p 9229:9229 korosuke613/node_learn /bin/bash
```

### リモート（コンテナ内）での操作

```bash
root@hogehoge:/# cd /tmp/foo
root@hogehoge:/tmp/foo# node --inspect=0.0.0.0 bar.js
```

### 参考

[VScodeでDockerコンテナ上のNode.jsをデバッグする方法(英語)](https://alexanderzeitler.com/articles/debugging-a-nodejs-es6-application-in-a-docker-container-using-visual-studio-code/)

## Dockerイメージでやったこと

- ejsのインストール

```bash
npm install -g ejs
```

- `.bashrc`に`NODE_PATH`を追加

```bash
echo export NODE_PATH=/usr/local/lib/node_modules >> ~/.bashrc
```