const CategoryModel = require("./CategoryModel")
add=(req,res)=>{
   console.log(req.body);
   let CategoryObj = new CategoryModel();
   CategoryObj.name = req.body.name;
   CategoryObj.description = req.body.description;
   CategoryObj.save()
}

all=(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}