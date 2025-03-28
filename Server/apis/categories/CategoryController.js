const CategoryModel = require("./CategoryModel")
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
   let CategoryObj = new CategoryModel();
   let total=await CategoryModel.countDocuments().exec();
   CategoryObj.autoID = total + 1;
   CategoryObj.name = req.body.name;
   CategoryObj.description = req.body.description;
   CategoryObj.save()
   .then((categoryData)=>{
    res.json({
        status:200,
        success:true,
        message:"Category Added",
        data:categoryData
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
    CategoryModel.find(req.body)
    .limit(limit)
    .skip((currentPage-1)*limit)
    CategoryModel.find(req.body)
    .then(async(categoryData)=>{
        if(categoryData.length>0){
            let total = await CategoryModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Category loaded",
                data:categoryData
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