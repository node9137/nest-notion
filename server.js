import express from "express";
import pageRouter from "./routes/page.js"

const app = express();
app.use('/page', pageRouter)

app.listen(3002, () => {
    console.log("Server running on port 3002")    
})