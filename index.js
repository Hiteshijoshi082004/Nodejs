// console.log("helloxjasjskdsx21323")
const express = require("express")
const app = express()
const PORT = 5002
// database connectivity 
const db = require("./Server/config/db")
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))
// controller router check 
const api=require("./server/routes/ApiRoutes")
app.use("/apis", api)
app.listen(PORT,()=>{
    console.log("SERVER is running at PORT", PORT);
})
app.get("/",(req,res)=>{
    res.json({
        status: 200,
        success: true,
        Message: "Api is working"
    })
})