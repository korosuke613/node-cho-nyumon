//declare function require(x: string): any;

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./list2-15.ejs', 'utf-8');
const style_css = fs.readFileSync('./list2-14.css', 'utf-8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');


function getFromClient(request, response) {
    var url_part = url.parse(request.url);
    switch (url_part.pathname) {
        case '/':
            var content = ejs.render(index_page, {
                title: "Indexページ",
                content: "これはテンプレートを使ったサンプルページです。",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
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

