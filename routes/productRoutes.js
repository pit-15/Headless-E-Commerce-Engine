import express, { Router } from "express";
import { createProducts, getallProducts, UpdateProducts } from "../controllers/ProductController.js";
import verifytokens from "../middlewares/verifytokens.js";
import authorizeroles from "../middlewares/authorizeroles.js";

const router = express.Router();

router.post("/",verifytokens ,authorizeroles("Admin","Staff"),createProducts);
router.put("/:id",verifytokens,authorizeroles("Admin","Staff"),UpdateProducts);
router.get("/",getallProducts);
export default router;