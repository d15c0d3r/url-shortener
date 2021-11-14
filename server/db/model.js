const mongoose = require("mongoose")
const Schema = mongoose.Schema

const urlSchema = new Schema({
    url : {
        type : String,
        required : true
    }
},{ timestamps : true })

const Url = mongoose.model("url", urlSchema)

module.exports = Url