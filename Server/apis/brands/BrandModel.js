const mongoose = require("mongoose")
const BrandSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    name:{type:String,default:""},
    description:{type:String, default:""},
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("BrandModel", BrandSchema)