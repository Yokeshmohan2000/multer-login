const multer=require("multer")
const express=require('express')
const mongoose=require("mongoose")
const cors=require('cors')
const url="mongodb://127.0.0.1:27017/Multer"
const path=require('path')
const imgschema=require('./schema')
const fs =require("fs")
const app=express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname)))
app.use(express.urlencoded({extended:true}))


mongoose.connect(url)

const storage=multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
        return cb(null,Date.now() + ' ' +file.originalname)
    }
    })
const upload=multer({
    storage:storage
})
app.post('/',upload.single('file'),async(req,res)=>{
    const data=await new imgschema({
        name    :req.body.name,
        email   :req.body.email,
        password:req.body.password,

        originalname:req.file.originalname,
        mimetype    :req.file.mimetype,
        path        :req.file.path,
        filename    :req.file.filename,
        size        :req.file.size

    })
    await data.save()
    res.json('upload succesfully')
})
app.get('/',async(req,res)=>{
    const data= await imgschema.find()
    res.json(data)
})
app.get('/:id', async (req,res)=>{
    const data= await imgschema.findById(req.params.id)
    res.json(data)
})
app.delete('/:id',async(req,res)=>{
       const del= await imgschema.findByIdAndDelete(req.params.id)
       fs.unlink(del.path,((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Deleted');
        }
       }))
       await imgschema.findByIdAndDelete(req.params.id)
       return res.json('Deleted')
})
app.put('/:id',upload.single('file'),async(req,res)=>{
    const data = await imgschema.findById(req.params.id)
    fs.unlink(data.path,((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('updated');
        }
 }))
    const edit= await imgschema.findByIdAndUpdate(req.params.id)
            edit.name    =req.body.name,
            edit.email   =req.body.email,
            edit.password=req.body.password,
            
            edit.originalname=req.file.originalname
            edit.mimetype    =req.file.mimetype
            edit.path        =req.file.path
            edit.filename    =req.file.filename
            edit.size        =req.file.size
             edit.save()
            res.json('updated')
})   

        app.listen(3001,()=>{
        console.log('server start 3001');
    })

