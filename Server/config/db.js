const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/clothes")
.then(()=>{
    console.log("Database is connected!!"); 
})
.catch((error)=>{
    console.log("Error while connecting database", error); 
})