const express = require("express")
const cors = require("cors")
const app = express()
const Url = require("./db/model")

app.use(cors())
app.use(express.json())

//db connection
const mongoose = require("mongoose")
const dbURI = "mongodb+srv://naga:12345@urls.wqtw5.mongodb.net/url_db?retryWrites=true&w=majority" 
mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(result => app.listen(4001,() => {
        console.log("db connected and server started @ port 4001")
    }))
    .catch(err=> console.log(err))

//apis
app.post("/shorten", async(req,res)=>{
    const check_url = req.body.url
    const check_name = req.body.name
    console.log(req.body)
    //check if the url exists and add to db
    const [found] = await Url.find({full : req.body.url, name : req.body.name})
    console.log(found)
    if(found){
        return res.send("TestURL or TestName already exists!")
    }
    else{
        const url = new Url({
            name : req.body.name,
            full : req.body.url
        })
        url.save()
            .then(result=>{
                console.log()
                return res.send("Test Link added!")
            })
            .catch(err=>{
                console.log(err)
            })
    }
    
})

app.get("/name/:name" , async(req,res)=>{
    const name  = req.params.name

    //check if test name already exists
    const found = await Url.findOne({name : name})
    if(found){
        return res.send({
            name  : found.name,
            full : found.full,
            short : found.short,
            visits : found.visits,
        })
    }else res.send("No Test links found")

})

app.get("/find-all/urls", async(req,res)=>{
    const urls = await Url.find();
    return res.send(urls)
})

app.get("/:url" , async(req,res)=>{
    const url  = req.params.url

    //check if test name already exists
    const found = await Url.findOne({short : url})

    if(found){
        const new_visits = found.visits+1
        try{
            const found = await Url.findOneAndUpdate({short : url}, {
                $set : {
                    visits : new_visits
                }   
            })
        }catch(err){
            console.log(err);
        }
        res.redirect(found.full)
    }
})

