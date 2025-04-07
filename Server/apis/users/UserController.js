// const UserModel = require("./UserModel")
// add= (req,res)=>{
//     let validation="" 
//     let formData=req.body 
//     if(!formData.email){
//         validation+=" Email is required"
//     }
//     if(!formData.name){
//         validation+=" Name is required"
//     } 
//     if(!formData.address){
//         validation+=" Address is required"
//     }
//     if(!formData.username){
//         validation+=" Username is required"
//     }  
//     if(!formData.password){
//         validation+="Password is required"
//     }
//     if(!formData.phone){
//         validation+="Phone is required"
//     }  
//     if(!!validation){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         UserModel.findOne({username:formData.username})
//         .then(async (UserData)=>{
//             if(!UserData){
//                 let UserObj= new UserModel()
//                 let total=await UserModel.countDocuments().exec()
//                 UserObj.autoID=total+1
//                 UserObj.username=formData.username
//                 UserObj.password=formData.password 
//                 UserObj.email=formData.email
//                 UserObj.name=formData.name 
//                 UserObj.address=formData.address 
//                 UserObj.phone = formData.phone 
//                 UserObj.save()
//                 .then((UserData)=>{
//                     res.json({
//                         status:200,
//                         success:true,
//                         message:"User Added!!",
//                         data:UserData
//                     })
//                 })
//                 .catch((err)=>{
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"internal server error"
//                     })
//                 })
//             }else{
//                 res.json({
//                     status:200,
//                     success:false,
//                     message:"Data already exist on given name"
//                 })
//             }
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error!!"
//             })
//         })
       
//     }
// }

// all = (req,res)=>{
//     let formData = req.body
//     let limit =formData.limit
//     let currentPage = formData.currentPage
//     delete formData.limit 
//     delete formData.currentPage
//     UserModel.find(formData)
//     .limit(limit)
//     .skip((currentPage-1)*limit)
//     .then(async(UserData)=>{
//         if(UserData.length>0){
//                  let total = await UserModel.countDocuments().exec()
//                  res.json({
//                     status:200,
//                     success:true,
//                     message:"User loaded",
//                     data:UserData
//                      })
//         }else{   
//             res.json({
//                 status:404,
//                 success:false,
//                 message:"User not found!!"
//             })
//         }
//     })
//     .catch((err)=>{
//         res.json({
//             status:500,
//             success:false,
//             message:"Internal server error",
//             error:err
//         })
//     })
// }

// updateUser = (req,res)=>{
//    let validation =""
//    let formData = req.body
//    if(!formData){
//     validation+="id is required"
//    }
//    if(!!validation){
//     req.json({
//         status:422,
//         success:false,
//         message:validation
//     })
//    }
//    else{
//     UserModel.findOne({_id:formData._id})
//     .then((UserData)=>{
//         if(!UserData){
//         res.json({
//             status:404,
//             success:false,
//             message:"User not found"
//         })
//         }
//         else{
//             if(!!formData.name){
//                 UserData.name = formData.name
//             }
//             if(!!formData.username){
//                 UserData.username = formData.username
//             }
//             if(!!formData.email){
//                 UserData.email = formData.email
//             }
//             if(!!formData.phone){
//                 UserData.phone = formData.phone
//             }
//             if(!!formData.address){
//                 UserData.address = formData.address
//             }
//             if(!!formData.password){
//                 UserData.password = formData.username
//             }
//             UserData.save()
//             .then((UserData)=>{
//                 res.json({
//                     status:200,
//                     success:true,
//                     message:"User updated",
//                     data:UserData
//                 })
//             })
//             .catch((err)=>{
//                 res.json({
//                     status:500,
//                     success:false,
//                     message:"Internal Server Error"
//                 })
//             })
//         }
//     })

//     .catch((err)=>{
//         res.json({
//             status:500,
//             success:false,
//             message:"Internal Server Error"
//         })
//     })
//    }
// }

// deleteUser = (req,res)=>{
//     // console.log(req.body)
//     let validation=""
//     if(!req.body._id){
//         validation+="id is required"
//     }
//     // console.log(validation.length)
//     if(!!validation){
//         res.json({
//             status:422,
//             success:false,
//             message: validation
//         })
//     }
//     else{
//         UserModel.findOne({_id:req.body._id})
//         .then((UserData)=>{
//             if(!UserData){
//                 res.json({
//                     status:404,
//                     success: false,
//                     message:"data not found"
//                 })
//             }
//             else{
//                 UserData.deleteOne({_id:req.body._id})
//                 .then((UserData)=>{
//                     res.json({
//                         status:200,
//                         success:true,
//                         message:"user deleted",
//                     })
//                 })
//                 .catch((err)=>{
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"Internal Server Error"
//                     })
//                 })
//             }
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal Server Error"
//             })
//         })
//     }
// }

// module.exports={add, all, updateUser, deleteUser}