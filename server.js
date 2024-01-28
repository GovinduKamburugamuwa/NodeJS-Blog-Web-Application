const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
let num = _.random(0,20);
console.log(num);
res.setHeader('Content_Type','text/html');
let path = './views/';

switch(req.url)
{

    case '/':
        path = path +'/index.html';
        break;
    case '/about':
        path = path+ '/about.html';
        break;
    default:
        path = path +'/404.html';
        break;
}
fs.readFile(path,(err,data)=>
{
if(err)
{
    console.log(err);
    res.end();
}
else
{
res.write(data);
res.end();
}
});
});

server.listen(3000,'localhost',()=>{
    console.log('listening for a request');
});