const validateToken = require("../middleware/AuthCheck");

const productRouter = require("express").Router();

productRouter.get("/all-product", validateToken, (req,res)=>{
    console.log("Login User Detail : ", req.user);
    res.status(200)
        .json([
            {
                name : "apple",
                price : 100
            },
            {
                name : "banana",
                price : 70
            },
            {
                name : "charry",
                price : 150
            },
        ])
})

module.exports = productRouter