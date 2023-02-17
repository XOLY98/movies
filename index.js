// let {addition} =require('./addition.js');
// addition(3,7);
// addition(7,7)

//PORT\
// const port =parseInt(process.env.port) || 4000;

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

//----PATH---//
const path=require('path');

//---DATABASE---//
const db=require('./config');

//---Cors--//
const cors=require('cors');


//---BODY-PARSER--//
const bodyParser=require('body-parser');

//---PORT----//
const port = parseInt(process.env.PORT) || 4000;

//-----ROUTER-----//
const route =express.Router();
app.use(route,express.json,bodyParser.urlencoded({extended:false})
);
//-----//
app.use(route,cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080'],
    credentials:true
}),
express.json,
bodyParser.urlencoded({extended:false})
);

//---middleware--//
const {errorHandling}=require('./middleware/ErrorHandling')

//--MESSAGE--//
const{message}=require('./middleware/message');

//----home or---//
route.get('^/$|/movies/',(req,res)=>{
res.status(200).sendFile(path.join(__dirname,'./view/index.html'));
})

//---FETCH DATA FROM A DATABASE--//
route.get('/users',(req,res)=>{
    const strQry=
    `SELECT firstName,lastName,emailAdd,country FROM Users`;
    db.query(strQry,(err,data)=>{
        if(err) 
        throw err;
        res.status(200).json({result:data});
    })

})

//---REGISTER---//
route.post('/register',bodyParser.json(),(req,res)=>{
    let detail=req.body;
    console.log(detail);
    //--sql query--//
    const strQry=`INSERT INTO Users SET?;`;
    db.query(strQry,[detail],(err)=>{
        if(err){
            res.status(400).json({err});
        }else{
            res.status(200).json({msg:'A user record was saved'})
        }
    })
})

//--update---//
route.put('/update',bodyParser.json(),(req,res)=>{
    let detail=req.body;
    console.log(detail);
    //--sql query--//
    const strQry=`UPDATE Users SET firstName='Xolelwa' WHERE lastname='Manqina';`;
    db.query(strQry,[detail],(err)=>{
        if(err){
            res.status(400).json({err});
        }else{
            res.status(200).json({msg:'A user record was updated'})
        }
    })
})

//--DELETE---//
route.delete('/delete',bodyParser.json(),(req,res)=>{
    let detail=req.body;
    console.log(detail);
    
    
    //--sql query--//
    const strQry=`DELETE FROM Users WHERE firstName='Xolelwa';`;
    db.query(strQry,[detail],(err)=>{
        if(err){
            res.status(400).json({err});
        }else{
            res.status(200).json({msg:'A user record was deleted'})
        }
    })
})

 
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})