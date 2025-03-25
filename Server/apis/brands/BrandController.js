const BrandModel = require("./BrandModel")
add= async(req,res)=>{
   let validation = ""
   let formData =req.body
   if(!formData.name){
    validation +=" Name is required, "
   }
   if(!formData.description){
    validation +=" description is required "
   }
   if(!!validation){
    res.json({
        status: 422,
        success: false,
        Message: validation
    })
   }
   else{
    console.log(req.body)
    let BrandObj = new BrandModel();
    let total= await BrandModel.countDocuments().exec()
    BrandObj.autoID=total+1;
    BrandObj.name = req.body.name;
    BrandObj.description = req.body.description;
    BrandObj.save()
    .then((brandData)=>{
        res.json({
            status:200,
            success:true,
            message:"Brand Added",
            data:brandData
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
   BrandModel.find(req.body)
       .then((brandData)=>{
           if(brandData.length>0){
               res.json({
                   status:200,
                   success:true,
                   message:"Brand loaded",
                   data:brandData
               })
           }else{
               res.json({
                   status:404,
                   success:false,
                   message:"category not found!!"
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