const CategoryController= require("../apis/categories/CategoryController")

const BrandController= require("../apis/brands/BrandController")

const ProductController = require("../apis/products/ProductController")
// IMPORT EXPRESS PACKAGE
const express=require("express")
const router=express.Router()
// CATEGORY 
router.post("/categories/add",CategoryController.add)

router.post("/categories/all", CategoryController.all)
// BRAND
router.post("/brands/add",BrandController.add)

router.post("/brands/all", BrandController.all)
// PRODUCT 
router.post("/products/add",ProductController.add)

router.post("/products/all",ProductController.all)


module.exports=router