const UserModel = require("./UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { use } = require("../../routes/ApiRoutes")
const SECRET = "MyProject@12345"
login =(req,res)=>{
    let formData = req.body
    let validation=""
    if(!formData.email){
        validation+="email is required"
    }
    if(!formData.password){
        validation+="password is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        UserModel.findOne({email:formData.email})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:200,
                    success:false,
                    message:"User doesn't exist on this email"
                })
            }else{
                let result = bcryptjs.compareSync(formData.password, userData.password)
                if(result){
                    let payload ={
                        name:userData.name,
                        email:userData.email,
                        userId:userData._id,
                        userType:userData.userType
                    }
                    let token = jwt.sign(payload, SECRET, {expiresIn:"24h"})
                    res.json({
                        status:200,
                        success:true,
                        message:"Login successfully",
                        data:userData,
                        token:token
                    })
                }
                else{
                    res.json({
                        status:200,
                        success:false,
                        message:"Invalid credentials"
                    })
                }
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

module.exports ={login}