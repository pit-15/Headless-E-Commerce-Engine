import Order from "../models/order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import ErrorResponse from "../middlewares/errorResponse.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

export const quickbuy = asyncHandler(async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {

            const { productId, quantity } = req.body;
            const user = await User.findById(req.user.id).session(session);

           
            const updatedProduct = await Product.findOneAndUpdate(
                { 
                    _id: productId, 
                    stock: { $gte: quantity } 
                },
                { 
                    $inc: { stock: -quantity } 
                },
                {
                     new: true,
                     session 
                }
            );

            if (!updatedProduct) {
                throw new ErrorResponse('Product is out of stock', 400);
            }

            const order = await Order.create(
                [{
                    customer: user._id,
                    customerName:user.username,
                    items: [
                        {
                            productID: productId,
                            name:updatedProduct.name,
                            quantity:quantity,
                            priceAtPurchase: updatedProduct.price
                        }
                    ],
                    totalAmount: updatedProduct.price * quantity,
                    status: "Paid"
                }],
                { session }
            );

            res.status(201).json({ success: true, data: order[0] });
        });
    } catch (err) 
    {
        next(err);
    }
    finally 
    {
        session.endSession();
    }
}
)


export const checkout = asyncHandler(async(req,res,next)=>
{
    let { items }=req.body;
    
    if (!Array.isArray(items) || items.length===0 || !items.every(item => typeof item.quantity === 'number' && item.quantity>0))
    {
        throw new ErrorResponse("Cart must contain items with positive quantities ",400)
    }

    const session = await mongoose.startSession();
    let totalAmount=0;
    let orderitems=[];
    try
    {
        await session.withTransaction(async ()=>
        {        
          const user = await User.findById(req.user.id).session(session)
          for (let item of items)
          {
            const cartproduct = await Product.findOneAndUpdate(
                {
                    _id: item.productID,
                    stock:{$gte:item.quantity}
                },
                {
                    $inc:{stock:-item.quantity}
                },
                {
                    new:true,
                    session
                }
            )
            
            if(!cartproduct){
                const productDetails = await Product.findOne({_id: item.productID});
            throw new ErrorResponse(`Product ${productDetails.name} is out of stock`,400)   
                                                                           
            }
            
            totalAmount += cartproduct.price*item.quantity;

              orderitems.push({
                productID:item.productID,
                name:cartproduct.name,
                quantity:item.quantity,
                priceAtPurchase:cartproduct.price
            })
            
         }
              
           const order = await Order.create(
            [{
                customer:user._id,
                customerName:user.username,
                items:orderitems,
                totalAmount:totalAmount,
                status:"Paid"
            }],{session})

            return res.status(201).json({success:true,data:order[0]})
    })
}
    catch(err)
    {
        next(err);
    }
    finally
    {
        session.endSession();
    }
} )