const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;
const list = [];
let a=1 ;

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Charset', 'UTF-8');
            res.end(fs.readFileSync('index.html'), 'UTF-8', null);
            break;
        case '/message':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            res.setHeader('Charset', 'UTF-8');
            res.end(JSON.stringify(list));
            break;
        case '/add':
            if(req.method != 'POST')
            {
                res.statusCode = 400;
                res.end();
                break;
            }
            req.on('data', (chunk) => {
                
                let obj = JSON.parse(chunk.toString('UTF-8'));
                if(!obj && !obj.text )
                {
                    res.statusCode = 400;
                    res.end();
                    return;
                }
                list.unshift({nomer:a,text:obj.text});
                a++;
                list.splice(5);
                
                res.statusCode = 202;
                res.end();
            });
            break;
        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});