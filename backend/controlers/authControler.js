const userModel=require('../database/schema')
const jwt=require('jsonwebtoken')

const signup=async (req, res)=>{
    try{
        const {name, email, password, confirmPassword}=req.body

        let existsinguser=await userModel.findOne({email})
        if(existsinguser){
            return res.status(400).send("user alredy exists...!")
        }
        if(password!==confirmPassword){
            return res.status(400).send("Password is mismatching...!")
        }

        let userdata=new userModel({
            name,email,password,confirmPassword
        })
        await userdata.save()
        res.status(200).send("New User Created...!")
    }
    catch(err){
        res.send(500).json({
            message:err
        })
    } 
}
const login=async (req, res)=>{
    try{
        const {email, password}=req.body

        let existsinguser=userModel.findOne({email})
        if(!existsinguser){
            return res.status(400).send("user not exists...!")
        }
        if(password===existsinguser.password){
            return res.status(400).send("You entered worng password...!")
        }
        let payload={
            user:{id:existsinguser._id}
        }
        jwt.sign(payload, 'PAVAN-login', {expiresIn:10000000}, (res, token)=>{
        if(err) return err
        return res.send(token)})
    }
    catch(err){
        res.send(500).json({
            message:err
        })
    } 
}

const protecter=(req, res, next)=>{
    try{
        let token=req.header('x-token')
        if(!token){
            return res.status(400).send('Your not Autharized')
        }
        let decode=jwt.verify(token, "PAVAN-login")
        req.user=decode.user
        next()
    }
    catch(err){
        res.send(500).json({
            Message:err.message
        })
    }
    

}

module.exports={signup, login, protecter}