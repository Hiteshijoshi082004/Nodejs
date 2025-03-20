const CategoryController=require("../apis/categories/CategoryController")

const express=require("express")
const router=express.Router()
router.get("./categories/add",CategoryController.add)

router.post("./categories/all", CategoryController.all)



module.exports=router