const express=require('express');
const upload=require('../Helper/userImage');
const { createUser, loginUser, userDashBoard } = require('../Controller/userController');
const { authCheck } = require('../Middleware/Auth');
const Router=express.Router();

Router.post('/create',upload.single('image'),createUser);
Router.post('/login',loginUser);
Router.get('/user/dashboard',authCheck,userDashBoard);

module.exports=Router;