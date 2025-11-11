const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Mongodb Connected..");
    }).catch((error)=>{
        console.log("Mongodb Error : ",error);
    })