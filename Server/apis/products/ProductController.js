const ProductModel = require("./ProductModel")
add= async(req,res)=>{
    let validation =""
    let formData = req.body
    if(!formData.name){
     validation+=" Name is required, " 
    }
    if(!formData.description){
     validation+=" description is required"
    }
    if(!!validation){
     res.json({
         status:422,
         success:false,
         message: validation
     })
    }
    else{
        console.log(req.body);
        let ProductObj = new ProductModel();
        let total = await ProductModel.countDocuments().exec();
        ProductObj.autoID=total+1;
        ProductObj.name = req.body.name;
        ProductObj.description = req.body.description;
        ProductObj.save()
        .then((productData)=>{
            res.json({
                status:200,
                success:true,
                message:"Product Added",
                data:productData
            })
})
    .catch((err)=>{
    res.json({
        status:500,
        success:false,
        message:"Internal server error!!",
        error:err
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
module.exports={add, all, single,deleteProduct,deleteProductByParams}