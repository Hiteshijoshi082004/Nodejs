
// SERVER SETUP 
const express = require("express")

const app = express()

const PORT = 5050
app.listen(PORT,()=>{
    console.log("Port is running at portno",PORT)
})

app.get("/first",(req,res)=>{
    console.log("My name is Hiteshi Joshi")
    res.json({
        status:200,
        success:true,
        message:"My name is Hiteshi Joshi"
    })
})
app.post("/second",(req,res)=>{
    console.log("My College name is Guru Nanak Dev University")
    res.json({
        status:200,
        success:true,
        message:"My College name is Guru Nanak Dev University"
    })
})
app.get("/third",(req,res)=>{
    console.log("My hobby is to singing, dancing, swimming")
    res.json({
        status:200,
        success:true,
        message:"My hobby is to singing, dancing, swimming"
    })
})
app.post("/fourth",(req,res)=>{
    console.log("currently pursuing BTECH CSE")
    res.json({
        status:200,
        success:true,
        message:"currently pursuing BTECH CSE"
    })
})
app.get("/fifth",(req,res)=>{
    console.log("My Technology is MERN STACK")
    res.json({
        status:200,
        success:true,
        message:"My Technology is MERN STACK"
    })
})
