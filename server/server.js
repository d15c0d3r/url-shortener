const express = require("express")
const cors = require("cors")
const app = express()
const Url = require("./db/model")

app.use(cors())
app.use(express.json())

//db connection
const mongoose = require("mongoose")
const dbURI = "mongodb+srv://naga:12345@urls.wqtw5.mongodb.net/url_db?retryWrites=true&w=majority" 
mongoose.connect(dbURI, {urNewUrlParser : true, useUnifiedTopology : true})
    .then(result => app.listen(4001,() => {
        console.log("db connected and server started @ port 4001")
    }))
    .catch(err=> console.log(err))

//apis
app.post("/",(req,res)=>{
    const url = new Url({
        url : req.body.url
    })
    url.save()
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
})

