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
    ProductModel.find(req.body)
        .then((productData)=>{
            if(productData.length>0){
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
module.exports={add, all}