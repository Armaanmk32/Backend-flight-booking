const express = require("express")

const app =  express.Router()

const userModel = require("../model/userModel")

app.post("/user/create", async (req,res)=>{
    const newUser = userModel(req.body)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("post has been created")
    }
})



// login user user jiro soo raadi 

app.post("/user/login", async (req,res)=>{
   if(req.body.email && req.body.password){

    const user = await userModel.findOne(req.body).select("-password")

    if(user){
        res.send(user)

    }
    else{
        res.send({
            error: "Incorecct password or username"
        })
    }
   }
   
   else{
    res.send({
        error: "Please Enter email and password"
    })
   }
})

module.exports = app