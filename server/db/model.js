const mongoose = require("mongoose")
const shortId = require("shortid")

const Schema = mongoose.Schema

const urlSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    full : {
        type : String,
        required : true
    },
    short : {
        type : String,
        required : true,
        default : shortId.generate
    },
    visits : {
        type : Number,
        default : 0,
        required : true
    }
},{ timestamps : true })

const Url = mongoose.model("url", urlSchema)

module.exports = Url