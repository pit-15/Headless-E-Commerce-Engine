import mongoose from "mongoose";

const orderitemSchema = new mongoose.Schema({

    productID:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',  
    },
    name:
    {
        type:String,
        required:true
    },
    quantity:
    {   
        type:Number,
        required:true,
        min:1
    },
    priceAtPurchase:
    {
        type:Number,
        required:true,
        min:0
    }
},{_id:false})  

const OrderSchema = new mongoose.Schema(
    {
        customer:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        customerName:
        {
            type:String,
            required:true
        },
        items:
        {
            type:[orderitemSchema], 
            required:true,
            validate: 
                    { validator:(v) => Array.isArray(v) && v.length >0,
                        message:'Order must contain atleast one item'
                    }
        },
        totalAmount:
        {
            type:Number,
            required:true,
            min:0
        },
        status:
        {
            type:String,
            enum:["Shipped","Paid","Cancelled","Pending"],
            default:"Pending",
            required:true
        }
    },
    {
        timestamps:true
    }
)
const Order = mongoose.model("Order",OrderSchema);
export default Order