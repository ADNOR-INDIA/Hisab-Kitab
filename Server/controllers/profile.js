const mongoose = require('mongoose')
const express = require('express')
const ProfileModel = require('../models/ProfileModel')
const router = express.Router()
// this section will completed in the last.
export const getProfiles=async(req, res)=>{
    try{
        const allProfiles = await ProfileModel.find().sort({_id:-1})
        res.status(200).json(allProfiles)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

export const getProfile = async(req, res)=>{
    const{id} = req.params
    try{
        const Profile = await ProfileModel.findById(id)
        res.status(200).json(profile)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}


