const ProductModel = require("./ProductModel")
add= async(req,res)=>{
   console.log(req.body);
   let ProductObj = new ProductModel();
   let total = await ProductModel.countDocuments().exec();
   ProductObj.autoId=total+1;
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

all=(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}