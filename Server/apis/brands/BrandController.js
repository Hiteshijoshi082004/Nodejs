const BrandModel = require("./BrandModel")
add= async(req,res)=>{
    console.log(req.body)
    let BrandObj = new BrandModel();
    let total= await BrandModel.countDocuments().exec()
    BrandObj.autoId=total+1;
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

all=(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}