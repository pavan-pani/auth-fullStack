const { Router } = require('express')
const express=require('express')
const mongoose=require('mongoose')
const userModel=require('./backend/database/schema')
const controllers=require('./backend/controlers/authControler')

const app=express()
app.use(express.json())

const DB="mongodb+srv://pavan:pavan@cluster0.avsecbw.mongodb.net/userData?retryWrites=true&w=majority"
// mongoose.connect(DB).then(()=>{console.log("DB is conneced...")})
mongoose.connect(DB).then(()=>{
    console.log('DB is connected...!');
 })

 app.post('/signup', controllers.signup)
 app.post('/login', controllers.login)

app.listen(3000, ()=>console.log("Server is Running..."))