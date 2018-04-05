var express = require('express');
var router = express.Router();

/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/', function(req, res, next) {
  var param = {"result":"Hello Beeno!"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

/* サンプルAPI② 
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

/* サンプルAPI③ 
 * http://localhost:3000/samples/hello/(任意の文字列) にGETメソッドのリクエストを投げると、
 * JSON形式で(任意の文字列)を返す。
 */
router.get('/hello/:place', function (req, res, next) {
    var param = {"result":"Hello "+ req.params.place + " !","shop name":req.query.shop};  // ← ★★ 追加 ★★
    res.header('Content-Type', 'application/json; charset=utf-8')  // 「レスポンスはJSON形式で返すよ」の意味
    res.send(param);                                               // 「レスポンス送るよ」の意味
  });
  

/* サンプルAPI④ 
 * http://localhost:3000/samples にPOSTメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post('/', function(req, res, next) {
    var param = {"result":"Good","card":req.body.card};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  });

module.exports = router;