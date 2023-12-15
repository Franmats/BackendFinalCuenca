import { Router } from "express";
import { getProductById, getProductsViews } from "../controllers/productsview.controller.js";

const router = Router()

router.get("/",getProductsViews)
router.get("/:query",getProductsViews)
router.get("/product/:id",getProductById)

export default router