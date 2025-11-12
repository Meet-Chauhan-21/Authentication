const express = require("express")
const app = express()
require("dotenv").config()
require("./model/db")
const bodyParser = require("body-parser")
const cors =require("cors")
const AuthRouter = require('./routes/AuthRoutes')
const productRouter = require("./routes/ProductRouter")

app.use(bodyParser.json());
app.use(cors());

app.get("/test",(req,res)=>{
    res.send("test the auth app..");
})

app.use("/auth", AuthRouter)
app.use("/product", productRouter)

app.listen(process.env.PORT || 8080 , ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    
})