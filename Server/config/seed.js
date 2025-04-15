const userModel = require("../apis/users/UserModel")
const bcryptjs = require("bcryptjs")
userModel.findOne({email:"admin@gmail.com"})
.then((userData)=>{
    if(!userData){
        let userObj=new userModel()
        userObj.name="admin"
        userObj.email="admin@gmail.com"
        userObj.password=bcryptjs.hashSync("123",10)
        //salt round inc -> security->inc / time -> inc
        userObj.userType=1 
        userObj.save()
        .then((userData)=>{
            console.log("Admin seeded successfully!!");  
        })
        .catch((err)=>{
            console.log("Error while seeding admin!!");
        })
    }else{
        console.log("Admin already exist!!");
        
    }
})
.catch((err)=>{
    console.log("Error while seeding error", err);
})