const express = require("express")
const router = express.Router()

const reportmodel = require("../model/reportModel")


router.post("/report", async (req, res)=>{
    const newReport = reportmodel(req.body)
    const saveReport = await newReport.save()
    if(saveReport){
        res.send("report has been successfully")
    }
})


router.get("/report/get", async (req, res)=>{
    const getData = await reportmodel.find()
    if(getData){
        res.send(getData)
    }
})



 module.exports = router