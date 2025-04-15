const mongoose = require("mongoose")

let CustomerSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    phone:{type:String, default:""},
    address:{type:String, default:""},
    userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"}
})

module.exports = mongoose.model("CustomerModel", CustomerSchema)