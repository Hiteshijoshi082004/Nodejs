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
    CategoryModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
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
        CategoryModel.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"No category found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Category Loaded",
                    data:categoryData
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

deleteCategory = (req,res)=>{
    // console.log(req.body)
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    // console.log(validation.length)
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message: validation
        })
    }
    else{
        CategoryModel.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:404,
                    success: false,
                    message:"data not found"
                })
            }
            else{
                categoryData.deleteOne({_id:req.body._id})
                .then((categoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"category deleted",
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

deleteCategoryByParams = (req,res)=>{
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
        CategoryModel.findOne({_id:req.params._id})
        .then((categoryData)=>{
                if(!categoryData){
                    res.json({
                        status:404,
                        success:false,
                        message:"Category not found"
                    })
                }
                else{
                    CategoryModel.deleteOne({_id:req.params._id})
                    .then((categoryData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Category deleted!!"
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

updateCategory = (req,res)=>{
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
    CategoryModel.findOne({_id:formData._id})
    .then((categoryData)=>{
        if(!categoryData){
        res.json({
            status:404,
            success:false,
            message:"category not found"
        })
        }
        else{
            if(!!formData.name){
                categoryData.name = formData.name
            }
            if(!!formData.description){
                categoryData.description = formData.description
            }
            categoryData.save()
            .then((categoryData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"category updated",
                    data:categoryData
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
        CategoryModel.findOne({_id:formData._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"category not found"
                })
            }
            else{
                categoryData.status=!categoryData.status
                categoryData.save()
                .then((categoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"status updated",
                        data:categoryData
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

module.exports={add, all, single,deleteCategory, deleteCategoryByParams,updateCategory,changeStatus}