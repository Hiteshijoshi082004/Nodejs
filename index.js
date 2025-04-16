// console.log("helloxjasjskdsx21323")
// EXPRESS SETUP 
const express = require("express")

const app = express()

const PORT = 5002

// DATABASE CONNECTIVITY
const db = require("./Server/config/db")
const seed=require("./Server/config/seed")
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))
// CONTROLLER ROUTER CHECK  
const api=require("./Server/routes/ApiRoutes")
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