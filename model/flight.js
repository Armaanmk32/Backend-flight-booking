
const mongoose = require("mongoose")

const flightSchame = mongoose.Schema({

        name:{
            type: String,
            required: true,
        
        },

        email:{
            type: String,
            required: true,
        
        },


        from:{
            type:String,
            required:true
        },

        to:{
            type:String,
            required:true
        },

        departure:{
            type: Date,
            required:true
        },

        return:{
            type: Date,
            required:true
        },

        passanger:{
            type: Number,
            required:true
        },

        price:{
            type: Number,
            required:true
        },

        class:{
            type: String,
            required: true
        }

})

module.exports = mongoose.model("FLight", flightSchame)