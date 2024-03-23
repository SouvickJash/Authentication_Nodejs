const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
   product_name:{
      type:String,
      required:true
   },
   description: {
      type: String,
      required:true
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
})
userSchema.set('timestamps',true);
const userModel=mongoose.model('product',userSchema);
module.exports=userModel;