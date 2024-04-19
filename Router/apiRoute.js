const express=require('express');
const upload=require('../Helper/userImage');
const { createUser, loginUser, userDashBoard, forgetPassword, updatePassword } = require('../Controller/userController');
const { authCheck } = require('../Middleware/Auth');
const Router=express.Router();

Router.post('/create',upload.single('image'),createUser);
Router.post('/login',loginUser);
Router.get('/user/dashboard',authCheck,userDashBoard);
Router.post('/forget/password',forgetPassword);
Router.post('/update/password',authCheck,updatePassword)

module.exports=Router;