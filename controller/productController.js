const Product = require("../schema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError")

//Get All products
exports.getAllProducts = catchAsyncErrors(
    async (req, res) => {
        const products = await Product.find();
    
        res.status(201).json({
            success: true,
            products
        })
    }
)

//Create Product
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        try {
               const newProduct = new Product({
                 name : req.body.productName,
                 price : req.body.price
               })
               const product = await newProduct.save();
               res.status(201).json({
                 sucesss:true,
                 message:"Product added successfully",
               });
    
            // console.log(req.body.productName);
            // res.send(req.body);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    
)


//Update Product
exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
    
        if (!product) {
           
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
    
        res.status(200).json({
            success: true,
            product
        })
    }
)

//Delete Product
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
    
        if (!product) {
    
        }
    
        await product.remove();
    
        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })
    }
)