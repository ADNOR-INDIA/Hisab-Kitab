import mongoose from 'mongoose'
import ClientModel from '../models/ClientModel.js'

// this will be used to add create new customer, edit the customer, get the data of it etc.

// ====================IMPORTANT=====================
// currently i will not be making getClientByUser to see what happens(later i will include it)

// getting a particular client/customer
export const getClient = async(req, res)=>{
    const{id} = req.params
    try{
        const client = await ClientModel.findById(id)
        res.status(200).json(client)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

// getting all clients/customers
export const getClients = async(req, res)=>{
    const {page} = req.query
// not adding number of pages and page distribution functionality rn, later will do that.
    try{ 
        // const total = await ClientModel.countDocuments({})
        const clients = await ClientModel.find().sort({_id:-1})
        res.json({data:clients})
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// creating a client/customer
export const createClient = async(req, res)=>{
    const client = req.body
    const newClient = new ClientModel({...client, createdAt:newDate().toISOString()})

    try{
        await newClient.save()
        res.json(newClient)
    }
    catch(error){
        res.status(409).json(error.message)
    }
}

// update a client/customer
export const updateClient=async()=>{
    const{id: _id} = req.params
    const client = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No customer with this id exist')
    }
    const updatedClient = await ClientModel.findByIdAndUpdate(_id, {...client, _id}, {new:true})
    res.json(updatedClient)
}

// Delete a client
export const deleteClient = async()=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No customer with this id')
    }
    await ClientModel.findByIdAndDelete(id)
    res.json({message:'Client deleted successfully'}) 
}

// get client by user
export const getClientsByUser = async(req, res)=>{
    const {searchQuery} = req.query
    try{
        const clients = await ClientModel.find({userId:searchQuery})
    }
    catch(errpr){
        res.status(404).json({message:error.message})
    }
}