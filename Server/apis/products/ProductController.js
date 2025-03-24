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
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}