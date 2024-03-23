const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   phone:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   isAdmin:{
      type:String,
      default:'User'
   },
   image:{
      type:String,
   }
})
userSchema.set("timestamps", true);
const userModel=mongoose.model('register',userSchema);
module.exports=userModel