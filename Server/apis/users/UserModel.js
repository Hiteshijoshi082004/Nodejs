const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    name:{type:String,default:""},
    username:{type:String, default:""},
    email:{type:String, default:""},
    phone:{type:String, deafult: ""},
    address:{type:String, default:""},
    password:{type:String, default:""},
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("UserModel", UserSchema);
