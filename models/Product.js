import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    description:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    category:
    {
        type:String,
        enum:["Electronics","Clothing & Accessories","Pharmaceutical","Books","Furniture","Baby","Beauty","Sports,Fitness","Software"],
        required:true
    },
    stock:
    {
        type:Number,
        required:true,
        min:0,
        default:0
    },
    sku:
    {
        type:String,
        required:true,
        unique:true
    }

})
const Product = mongoose.model("Product",ProductSchema);

export default Product;