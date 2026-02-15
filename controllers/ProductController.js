import Product from "../models/Product.js"
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../middlewares/errorResponse.js";

export const createProducts = asyncHandler( async (req,res)=>
{
    const {name,description,price,category,stock,sku}=req.body;

    
    if (!name) {
        throw new ErrorResponse("Name of product is required",400);
    }
    if (!description) {
        throw new ErrorResponse("Description cannot be empty",400);
    }

    if (price===undefined) {
        throw new ErrorResponse( "Price cannot be empty" ,400);
    }
    if (!category) {

     throw new ErrorResponse("Provide category",400);}

    if (stock===undefined) {
        throw new ErrorResponse("Enter stock" ,400);
    }

    if (!sku) {
         throw new ErrorResponse("Enter SKU" ,400);
    }


    const product = new Product({name,description,price,category,stock,sku});

    await product.save();

    return res.status(201).json({
        message: "Product created successfully",
        product
    });

})

export const UpdateProducts = asyncHandler( async (req,res)=>
{

    let { id } = req.params; 

    const allowedfields = ["name","description","price","category","stock","sku"];
    const updates={};

    allowedfields.forEach(field =>
    {
      if(req.body[field]!==undefined)
      {
        updates[field]=req.body[field];
      }
    }
    )
     const product = await Product.findByIdAndUpdate(
        id,
       { $set:updates },
       {new:true , runvalidators:true}  
        );

        if(!product)
        {
            throw new ErrorResponse("Product not found!",404);
        }
        return res.status(200).json("Product Updated Successfully");
    
}
)


export const getallProducts = asyncHandler(async (req, res) => {
  const queryobj = { ...req.query };


  const excludefields = ["page", "sort", "limit", "fields"];
  excludefields.forEach((field) => delete queryobj[field]);

  let querstr = JSON.stringify(queryobj);
  querstr = querstr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  const products = await Product.find(JSON.parse(querstr));

 
  if (!products.length) {
    throw new ErrorResponse("No products found for the given query",404);
  }

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});
