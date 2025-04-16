const CategoryController= require("../apis/categories/CategoryController")
const BrandController= require("../apis/brands/BrandController")
const ProductController = require("../apis/products/ProductController")
const CustomerController = require("../apis/customers/CustomerController")
const UserController = require("../apis/users/UserController")
const multer=require("multer")

// CATEGORY STORAGE
const CategoryStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Server/public/categoryimages")
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +"-"+ file.originalname)
    }
  })
const CategoryUpload = multer({ storage: CategoryStorage })
// PRODUCT STORAGE
const ProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Server/public/productimages")
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +"-"+ file.originalname)
    }
  })
const ProductUpload = multer({ storage: ProductStorage })

// BRAND STORAGE
const BrandStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Server/public/brandimages")
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +"-"+ file.originalname)
    }
  })
const BrandUpload = multer({ storage: BrandStorage })
// IMPORT EXPRESS PACKAGE
const express=require("express")
const router=express.Router()

router.post("/customers/register", CustomerController.register)
router.post("/users/login", UserController.login)
// CATEGORY 
router.post("/categories/add" , CategoryUpload.single("image"),CategoryController.add)
router.post("/categories/all", CategoryController.all)
router.post("/categories/single", CategoryController.single)
router.delete("/categories/deleteCategory", CategoryController.deleteCategory)
router.delete("/categories/deleteCategoryByParams/:_id", CategoryController.deleteCategoryByParams)
router.post("/categories/updateCategory", CategoryController.updateCategory)
router.post("/categories/changeStatus", CategoryController.changeStatus)
// BRAND
router.post("/brands/add", BrandUpload.single("image"),BrandController.add)
router.post("/brands/all", BrandController.all)
router.post("/brands/single", BrandController.single)
router.delete("/brands/deleteBrand", BrandController.deleteBrand)
router.delete("/brands/deleteBrandByParams/:_id", BrandController.deleteBrandByParams)
router.post("/brands/updateBrand", BrandController.updateBrand)
router.post("/brands/ChangeStatus", BrandController.ChangeStatus)
// PRODUCT 
router.post("/products/add", ProductUpload.single("image"),ProductController.add)
router.post("/products/all",ProductController.all)
router.post("/products/single", ProductController.single)
router.delete("/products/deleteProduct", ProductController.deleteProduct)
router.delete("/products/deleteProductByParams/:_id", ProductController.deleteProductByParams)
router.post("/products/updateProduct", ProductController.updateProduct)
router.post("/products/changeStatus", ProductController.changeStatus)


module.exports=router