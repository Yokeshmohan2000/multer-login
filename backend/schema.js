const mongoose=require('mongoose')
const imgSchema=  mongoose.Schema({

      name:{type:String,require:true},
      email:{type:String,require:true},
      password:{type:String,require:true},
   
   originalname:{ 
      type:String
         },
   mimetype:{
        type:String
        },
   path:{         
      type:String
      },
   filename:{
      type:String
   },
   size:{
      type:Number
   }      
   })
module.exports=mongoose.model('multer',imgSchema)