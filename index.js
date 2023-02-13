// let {addition} =require('./addition.js');
// addition(3,7);
// addition(7,7)
const http=require('http');

//PORT\
const port =parseInt(process.env.port) || 4000;

//WEB SERVER//

// http.createServer((req,res)=>{
//     const currUrl = req.url;
//     console.log('Url: ', currUrl, '\nMethod: ', req.method);
//     res.writeHead(200, {'Content-type': ''});
//     switch(currUrl) {
//         case '/':
//             res.end('We are home');
//         break
//         case '/about':
//             res.end('About me page');
//         break
//         case '/data':
//             res.end('Page data');
//         break
//         default:
//             res.end('Page / content was not found');
//     }
// }) .listen(port,()=>{
//     console.log(`server is loading ${port}`);
// }
// )


const express= require('express');

//-----EXPRESS APP----//
const app=express();

//-----ROUTER-----//
const route =express.Router();
app.use(route)

//----home or---//
route.get('/',(req,res)=>{
res.status(200).send('well done');
})
 
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})