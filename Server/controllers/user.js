import jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import ProfileModel from '../models/ProfileModel.js'


// Creating a user i.e. making a signup function.
export const signup = async(req, res)=>{
    const{email, password, confirmPassword, firstName, lastName, bio} = req.body
    try{
        const existingUser = await User.findOne({email})
        const userProfile = await ProfileModel.findOne({userId: existingUser?._id})

        if(existingUser){
            return res.status(400).json({message:"User already exist with this email"})
        }
        if(password!=confirmPassword){
            return res.status(400).json({message:"confirm password does not match"})
        }
        // bcrypt.hash is used to change the password in some other encrypted form so that it cannot be easily hacked.
        const hasedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password:hasedPassword, name:`${firstName} ${lastName}`, bio})
        // creating a token when all the credentials are valid
        const token  = jwt.sign({email:result.email, id:result._id}, SECRET, {expiresIn:"8h"})
        // status 200 shows everything is OK.
        // sending the token in the body(client side)
        res.status(200).json({result, userProfile, token})
    }
    catch(error){
        res.status(500).json({message:"Something went wrong, please try again later"})
    }
}

// Creating a signin function
export const signin = async()=>{
    // taking the value of email and password from the login details filled by the user in the body and we will operate on these files.
    const{email, password}= req.body
    try{
        // User.findone helps to find the email which has come from the body, in the database with the help of User model.
        const existingUser = await User.findOne({email})
        if(!existingUser){
            res.status(400).json({message:"User does not exist"})
        }
        // get userprofile and append login auth detail
        const userProfile = await ProfileModel.findOne({userId: existingUser?._id})
        const checkPassword = await bcrypt.compare(password, existingUser.password)
        if(!checkPassword){
            res.status(400).json({message:"Invalid password"})
        }
        // creating a token when all the credentials are valid
        const token = jwt.sign({email:existingUser.email, id:existingUser._id})

        // sending the token in the body(client side)
        res.status(200).json({result:existingUser, userProfile, token})
    }
    catch(error){
        res.status(500).json({message:"Something Went wrong, please try again after sometime"})
    }
}
