add=(req,res)=>{
    console.log(req.body)
    BrandObj.name = req.body.name
    BrandObj.description = req.body.description
    let BrandObj = new BrandModel();
    BrandObj.save();

}

all=(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"All api is working!!"
    })
}
module.exports={add, all}