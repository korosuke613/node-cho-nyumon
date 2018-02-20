
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./list3-15.ejs', 'utf-8');
const other_page = fs.readFileSync('./list3-12.ejs', 'utf-8');
const style_css = fs.readFileSync('../sec3-1/list3-5.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

var data = {msg: 'no message...'};

var data2 = {
    '小西': ['小西ありさ', '福井', 'かわいい！' ],
    'ビーノ': ['福岡亮太', '福岡', 'ビノキン'],
    '宮地': ['宮地俊宏', '岡山', '闇地'],
    'パンダ': ['谷竜太郎', '和歌山', 'だっぱんだ'],
}

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
    // POSTアクセス時の処理
    if(request.method == 'POST'){
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', ()=>{
            data = qs.parse(body);
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    }else{
        write_index(request, response);
    }
}

function write_index(request, response){
    var msg = "※伝言を表示します。";
    var cookie_data = getCookie('msg', request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function setCookie(key, value, response){
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie(key, request){
    var cookie_data = request.headers.cookie != undefined ? request.headers.cookie: '';
    var data = cookie_data.split(';');
    for(var i in data){
        if(data[i].trim().startsWith(key + '=')){
            var result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return '';
}

function response_other(request, response){
    var msg = "これはOtherページです。";
    var content = ejs.render(other_page, {
        title: "Other",
        content: msg,
        data: data2,
        filename: 'list3-7'
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}