import dotenv from "dotenv"
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authroutes from "./routes/auth.js";
import productroutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";


connectDB();
const app = express();
app.use(express.json());


//routes
app.use("/auth",authroutes);
app.use("/products", productroutes);
app.use("/order",orderRoutes)
app.use(errorHandler)

const PORT=process.env.PORT || 7071

app.listen(PORT,()=>
{
    console.log(`Server Listening on ${PORT}`);
})
