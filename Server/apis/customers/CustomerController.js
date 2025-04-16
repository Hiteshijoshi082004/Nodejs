const UserModel = require("../users/UserModel")
const bcryptjs = require("bcryptjs")
const CustomerModel = require("./CustomerModel")
register =(req,res)=>{
    let formData = req.body
    // console.log(formData);
    let validation =""
    if(!formData.name){
        validation+="name is required"
    }
    if(!formData.email){
        validation+="email is required"
    }
    if(!formData.password){
        validation+="password is required"
    }
    if(!formData.phone){
        validation+="phone is required"
    }
    if(!formData.address){
        validation+="address is required"
    }

    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        UserModel.findOne({email:formData.email})
        .then(async(userData)=>{
            if(!userData){
                let userObj = new UserModel()   
                let total =  await UserModel.countDocuments().exec()
                userObj.autoId=total+1 
                userObj.name=formData.name 
                userObj.email=formData.email
                userObj.password=bcryptjs.hashSync(formData.password, 10)
                userObj.userType=2 
                userObj.save()
                .then(async (userData)=>{
                    let customerObj=new CustomerModel()
                    let total=await CustomerModel.countDocuments().exec()
                    customerObj.autoId=total+1 
                    customerObj.phone=formData.phone
                    customerObj.address=formData.address
                    customerObj.userId=userData._id 
                    customerObj.save()
                    .then((customerData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Customer registered successfully!!",
                            data1:userData,
                            data2:customerData
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                        
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error!!"
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist with same email",
                    data:userData
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

module.exports={register}