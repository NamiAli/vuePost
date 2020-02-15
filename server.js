const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()





mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`connection to database established`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 })
mongoose.connection.on("connected", err => {
    if(err) throw err
    console.log('Connected to database')
})


// mongoose schema
const postSchema = mongoose.Schema({
        title: String,
        content: String,
        author: String,
        timestamp: String
})

const postModel = mongoose.model("post", postSchema )


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get("/", (req, res) => {
    res.send("hi, there")
})


// api routes

app.post("/api/post/new", (req, res) => {
   let payload = {
       title: req.body.title,
       content: req.body.content,
       author: req.body.author,
       timestamp: new Date().getTime()
   }

   let newPost =  new postModel(payload)
   newPost.save((err, result) => {
       if(err) res.send({success: false, 
        msg: err})
        res.send({success: true, result: result})
   })
})

app.get("/api/posts/all", (req, res) => {
    postModel.find((err, result) => {
        if(err) res.send({success: false, msg: err})
        res.send({success: true, result: result})
    })
})

app.post("/api/post/update", (req, res) => {
     let id = req.body._id
     let payload = req.body
     postModel.findByIdAndUpdate(id, payload,  (err, result) => {
         if(err) res.send({success: false, msg: err})
         res.send({success: true, result: result})
     }) 
})


app.post("/api/post/remove", (req, res) => {
     let id = req.body._id

     postModel.findById(id).remove((err, result) => {
         if(err) res.send({success: false, msg: err})
         res.send({success: true, result: result})
     })
})





// start or server 

app.listen(process.env.PORT || 3000, (err) => {
  if(err) console.log(err)
  console.log("server has started on port %s", process.env.PORT || 3000)
})