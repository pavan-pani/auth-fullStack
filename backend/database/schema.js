const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmPassword:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel=mongoose.model('userData',userSchema)

module.exports=userModel