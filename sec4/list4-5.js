var express = require('express');
var ejs = require('ejs');

var app = express();
app.engine('ejs', ejs.renderFile);

app.get('/', (req, res) =>{
    // index.ejsをレンダリングする
    res.render('list4-4.ejs',{
        title: 'Index',
        content: 'This is Express-app Top page!'});
});

app.listen(3000, ()=>{
    console.log('Start server port:3000');
});