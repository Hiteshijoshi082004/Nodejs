const ProductModel = require("./ProductModel")
add=(req,res)=>{
   console.log(req.body);
   ProductObj.name = req.body.name
   ProductObj.description = req.body.description
   let ProductObj = new ProductModel();
   ProductObj.save()
}

all=(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}