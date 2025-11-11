const UserModel = require("../model/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req,res)=>{

    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message: "User Already Exiest..",
                    success: false
                })
        }
        const userModel = new UserModel({name,email,password})
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Successfully..",
                success: true
            }) 
    } catch(err) {
        res.status(500)
            .json({
                message: "Internal Server Error..",
                success: false
            }) 
    }

}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(409)
                .json({
                    message: "User Not Exiest..",
                    success: false
                })
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(409)
                .json({
                    message: "User Not Exiest..",
                    success: false
                })
        }



        res.status(201)
            .json({
                message: "Signup Successfully..",
                success: true
            }) 
    } catch(err) {
        res.status(500)
            .json({
                message: "Internal Server Error..",
                success: false
            }) 
    }
}

module.exports = {
    signup,
    login
}