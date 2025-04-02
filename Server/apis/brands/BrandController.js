const { changeStatus } = require("../categories/CategoryController")
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
  let formData = req.body
      let limit =formData.limit
      let currentPage = formData.currentPage
      delete formData.limit 
      delete formData.currentPage
      BrandModel.find(formData)
      .limit(limit)
      .skip((currentPage-1)*limit)
      .then(async(brandData)=>{
          if(brandData.length>0){
              let total = await BrandModel.countDocuments().exec()
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
                  message:"Brand not found!!"
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
        BrandModel.findOne({_id:req.body._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Brand found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Brand Loaded",
                    data:brandData
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

deleteBrand = (req,res)=>{
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
        BrandModel.findOne({_id:req.body._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"brand not found"
                })
            }
            else{
                BrandModel.deleteOne({_id:req.body._id})
                .then((brandData)=>{
                        res.json({
                                status:200,
                                success:true,
                                message:"brand is deleted"
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


deleteBrandByParams = (req,res)=>{
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
        BrandModel.findOne({_id:req.params._id})
        .then((brandData)=>{
                if(!brandData){
                    res.json({
                        status:404,
                        success:false,
                        message:"Brand not found"
                    })
                }
                else{
                    BrandModel.deleteOne({_id:req.params._id})
                    .then((brandData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Brand deleted!!"
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

updateBrand = (req,res)=>{
    let validation=""
    let formData = req.body
    if(!formData._id){
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
        BrandModel.findOne({_id:formData._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"brand not found!"
                })
            }
            else{
                if(!!formData.name){
                    brandData.name = formData.name
                }
                if(!!formData.description){
                    brandData.description = formData.description
                }
                brandData.save()
                .then((brandData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"brand updated!",
                            data:brandData
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

ChangeStatus = (req,res)=>{
    let validation =""
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
        BrandModel.findOne({_id:formData._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"brand not found"
                })
            }
            else{
                brandData.status = !brandData.status
                brandData.save()
                .then((brandData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"status updated",
                        data:brandData
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
module.exports={add, all, single,deleteBrand, deleteBrandByParams,updateBrand,ChangeStatus}