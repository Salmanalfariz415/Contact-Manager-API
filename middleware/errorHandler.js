
const constants=require('../constants');

const errorHandler=(err,req,res,next)=>{
    const statusCode =res.statusCode ? res.statusCode : 500; // Set default to 500 if status code is not set
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message:err.message,
                stackTrace :err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized",
                message:err.message,
                stackTrace:err.stack,
            })
        default:break;
    }
}
module.exports = errorHandler;