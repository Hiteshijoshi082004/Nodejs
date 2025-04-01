const CategoryController= require("../apis/categories/CategoryController")

const BrandController= require("../apis/brands/BrandController")

const ProductController = require("../apis/products/ProductController")
// IMPORT EXPRESS PACKAGE
const express=require("express")
const router=express.Router()
// CATEGORY 
router.post("/categories/add",CategoryController.add)
router.post("/categories/all", CategoryController.all)
router.post("/categories/single", CategoryController.single)
router.delete("/categories/deleteCategory", CategoryController.deleteCategory)
router.delete("/categories/deleteCategoryByParams/:_id", CategoryController.deleteCategoryByParams)
// BRAND
router.post("/brands/add",BrandController.add)
router.post("/brands/all", BrandController.all)
router.post("/brands/single", BrandController.single)
router.delete("/brands/deleteBrand", BrandController.deleteBrand)
router.delete("/brands/deleteBrandByParams/:_id", BrandController.deleteBrandByParams)
// PRODUCT 
router.post("/products/add",ProductController.add)
router.post("/products/all",ProductController.all)
router.post("/products/single", ProductController.single)
router.delete("/products/deleteProduct", ProductController.deleteProduct)
router.delete("/products/deleteProductByParams/:_id", ProductController.deleteProductByParams)


module.exports=router