//declare function require(x: string): any;

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./list3-8.ejs', 'utf-8');
const other_page = fs.readFileSync('../../sec2/sec2-4/list2-17.ejs', 'utf-8');
const style_css = fs.readFileSync('../sec3-1/list3-5.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

var data = {
    '小西':'かわいい',
    'ビーノ':'ビノキン',
    '宮地':'闇地',
    'パンダ':'だっぱんだ',
};

function getFromClient(request, response) {
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {
        case '/':
            response_index(request, response);
            break;
        
        case '/other':
            response_other(request, response);
            break;
        
        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

function response_index(request, response){
    var msg = "これはIndexページです。";
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        filename: 'list3-7',
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function response_other(request, response){
    var msg = "これはOtherページです。";

    // POSTアクセス時の処理
    if(request.method == 'POST'){
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', ()=>{
            var post_data = qs.parse(body);
            msg += 'あなたは、「' + post_data.msg + '」と書きました。';
            var content = ejs.render(other_page, {
                title:"Other",
                content:msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });
    // GETアクセス時の処理
    }else{
        var msg = "ページがありません。";
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}