const express = require('express')

const pageRouter = require('./routes/getPage')

const app = express()
app.use('/page',pageRouter)

app.listen(3000,()=>{
    console.log("Server Running")
})