const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //wrong mongodb id error
    if(err.name === "CastError"){  //the type of error can be seen if we print the err.stack instead of err.message
        const message = `Resource not found. Invalid : ${err.path}`;

        err = new ErrorHandler(message,400);
    } 

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};