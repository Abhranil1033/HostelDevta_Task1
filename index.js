console.log('Server is starting');

const express = require("express");

const errorMiddleware = require("./middleware/error");

const app = express();

const connectDatabase = require("./database");
const { urlencoded } = require("express");

//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);

    process.exit(1);
})

const dotenv = require("dotenv");
dotenv.config({path:'config/config.env'});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const product = require("./routes/productRoutes");

app.use('/api/v1',product);

app.use(errorMiddleware);

connectDatabase();

// app.get('/',(req,res)=>{
//     res.send("Server is running");
// })

app.listen(3000,(req,res)=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});

app.use(express.static('frontend'));


//Unhandled Promise Rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    //closing the server
    server.close(() => {
        process.exit(1);
    })
})


module.exports =  app;