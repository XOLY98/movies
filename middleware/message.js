function message(req,res,next) {
    console.log("message sent"); 
    next();
}
module.exports={message};