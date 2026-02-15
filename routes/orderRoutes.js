import {quickbuy,checkout} from "../controllers/OrderController.js";
import express from "express";
import verifytokens from "../middlewares/verifytokens.js";
import authorizeroles from "../middlewares/authorizeroles.js";

const router = express.Router();
router.post("/quickbuy",verifytokens,authorizeroles("Customer"),quickbuy)
router.post("/checkout",verifytokens,authorizeroles("Customer"),checkout)

export default router;  