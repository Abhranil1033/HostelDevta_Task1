const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name:{
     type:String,
     required : [true,"Enter product name"]
   },
   price:{
    type:Number,
    required : [true,"Enter product price"]
   }
})

module.exports = mongoose.model("Product",productSchema);