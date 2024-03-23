const express=require('express');
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads',express.static('uploads'))

const UserRoute=require('./Router/apiRoute');
app.use('/api',UserRoute)

// product route
const productRoute=require('./Router/productRoute');
app.use(productRoute);
    

const PORT= 6000;
const dbDriver="mongodb+srv://souvickjash9836:hahMNOgVnI9ioYbh@cluster0.3kynmom.mongodb.net/HOME"
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{

    app.listen(PORT,()=>{
        console.log(`server running port : http://localhost:${PORT}`);
        console.log(`Db connected successfully`);
    })
}).catch(error=>{
    console.log(error);
}) 