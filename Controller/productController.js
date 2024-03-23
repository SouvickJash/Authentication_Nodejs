// const { createToken } = require('../Middleware/Auth');
const userModel=require('../Model/productModel');
const {Validator}=require('node-input-validator')

const createProduct=async(req,res)=>{
   try{
      const{ product_name,description,price,quantity}=req.body;
      const v=new Validator(req.body,{
         product_name:"required|string",
         description:"required|string",
         price:"required|string",
         quantity:"required|string"
      })
      const match=await v.check();
      if(!match){
         return res.status(404).json({
            status:false,
            message:v.errors
         })
      }
      const user=new userModel({
         product_name,description,price,quantity
      })
     const result=await user.save();
     return res.status(201).json({
      status: true,
      message: "Data created successfully",
      data: result,
    });
   }catch(error){
      return res.status(500).json({
         status:false,
         message:error.message
      })
   }
}
//get
const getProduct=async(req,res)=>{
   try{
      const result=await userModel.find();
      return res.status(200).json({
         status:true,
         message:"Data fetch successfully",
         data:result
      })
   }
   catch(error){
      return res.status(500).json({
         status:false,
         message:error.message
      })
   }
}
//edit
const editProduct=async(req,res)=>{
   try{
     const id=req.params.id;
     const result=await userModel.findById(id);
     return res.status(200).json({
      status:true,
      message:"Edit data",
      data:result
     })

   }
   catch(error){
      return res.status(500).json({
         status:false,
         message:error.message
      })
   }
}
//update product
const updateProduct=async(req,res)=>{
   try{
      const id=req.params.id;
      const result=await userModel.findByIdAndUpdate(id,req.body,{
         new:true
      })
      return res.status(200).json({
         status:true,
         message:"data update successfully",
         data:result
      })
   }
   catch(error){
      return res.status(500).json({
         status:false,
         message:error.message
      })
   }
}
//delete product
const deleteProduct=async(req,res)=>{
   try{
    const id=req.params.id;
    const result=await userModel.findByIdAndDelete(id);
    return res.status(200).json({
      status:true,
      message:"Data deleted successfully",
      data:result
    })
   }
   catch(error){
      return res.status(500).json({
         status:false,
         message:error.message
      })
   }
}


module.exports={
   createProduct,
   getProduct,
   editProduct,
   updateProduct,
   deleteProduct
}