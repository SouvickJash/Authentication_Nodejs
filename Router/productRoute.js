const express=require('express');
const { createProduct, getProduct, editProduct, updateProduct, deleteProduct } = require('../Controller/productController');
const { authCheck } = require('../Middleware/Auth');
const Router=express.Router();

Router.post('/createproduct',authCheck,createProduct);
Router.get('/getproduct',authCheck,getProduct);
Router.get('/editproduct/:id',authCheck,editProduct);
Router.put('/updateproduct/:id',authCheck,updateProduct);
Router.delete('/deleteproduct/:id',authCheck,deleteProduct);

module.exports=Router;