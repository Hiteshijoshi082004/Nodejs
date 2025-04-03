const BrandModel = require("../brands/BrandModel")
const ProductModel = require("./ProductModel")
add= (req,res)=>{
    let validation="" 
    let formData=req.body 
    if(!formData.name){
        validation+="Product Name is required"
    }  
    if(!formData.description){
        validation+="Description is required"
    }  
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        ProductModel.findOne({name:formData.name})
        .then(async (productData)=>{
            if(!productData){
                let productObj= new ProductModel()
                let total=await ProductModel.countDocuments().exec()
                productObj.autoID=total+1
                productObj.name=formData.name
                productObj.description=formData.description 
                productObj.save()
                .then((productData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Product Added!!",
                        data:productData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data already exist on given name"
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
       
    }
}

all=(req,res)=>{
    let formData = req.body
    let limit =formData.limit
    let currentPage = formData.currentPage
    delete formData.limit 
    delete formData.currentPage
    ProductModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .then(async(productData)=>{
        if(productData.length>0){
            let total = await ProductModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Product loaded",
                data:productData
        })
    }else{
            res.json({
                status:404,
                success:false,
                message:"Product not found!!"
        })
}
})
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
        })
})
}

single=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        ProductModel.findOne({_id:req.body._id})
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Product found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Product Loaded",
                    data:productData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }    
}

deleteProduct = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation=+"id is required"
    }
    if(!!validation){
            res.json({
                status:422,
                success:false,
                message:validation
            })
    }
    else{
        ProductModel.findOne({_id:req.body._id})
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:404,
                    success: false,
                    message:"data not found"
                })
            }
            else{
                ProductModel.deleteOne({_id:req.body._id})
                .then((productData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Product deleted",
                            data: productData
                        })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
    }

}

deleteProductByParams=(req,res)=>{
    let validation=""
    if(!req.params._id){
        validation+="id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        ProductModel.findOne({_id:req.params._id})
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:404,
                    success:false,
                    message:"Product data not found!"
                })
            }
            else{
                ProductModel.deleteOne({_id:req.params._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Product is Deleted"
                    })

                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal Server Error"
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
    }
}

updateProduct = (req,res)=>{
   let validation =""
   let formData = req.body
   if(!formData){
    validation+="id is required"
   }
   if(!!validation){
    req.json({
        status:422,
        success:false,
        message:validation
    })
   }
   else{
    ProductModel.findOne({_id:formData._id})
    .then((productData)=>{
        if(!productData){
        res.json({
            status:404,
            success:false,
            message:"product not found"
        })
        }
        else{
            if(!!formData.name){
                productData.name = formData.name
            }
            if(!!formData.description){
                productData.description = formData.description
            }
            productData.save()
            .then((productData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"product updated",
                    data:productData
                })
            })
            .catch((err)=>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal Server Error"
                })
            })
        }
    })

    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal Server Error"
        })
    })
   }
}

changeStatus = (req,res)=>{
    let validation=""
    let formData = req.body
    if(!formData._id){
        validation+="id is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        ProductModel.findOne({_id:formData._id})
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:404,
                    success:false,
                    message:"product not found"
                })
            }
            else{
                productData.status=!productData.status
                productData.save()
                .then((productData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"status updated",
                        data:productData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal Server Error",
                        error:err
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error",
                error:err
            })
        })
    }
}


module.exports={add, all, single,deleteProduct,deleteProductByParams,updateProduct,changeStatus}