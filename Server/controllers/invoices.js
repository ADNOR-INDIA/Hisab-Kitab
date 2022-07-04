const express = require('express')
const mongoose = require('mongoose')
const InvoiceModel = require('../models/InvoiceModel.js')

export const getInvoicesByUser = async(req, res)=>{
    const {searchQuery} = req.query

    try{
        const invoices = await InvoiceModel.find({creator:searchQuery})
        res.status(200).json({data:invoices})
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

// getting total count of invoices.
export const getTotalCount = async (req, res) => {
    const {searchQuery} = req.query;

    try {
        // const invoices = await InvoiceModel.find({ creator: searchQuery });
        const totalCount = await InvoiceModel.countDocuments({ creator: searchQuery });

        res.status(200).json(totalCount);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// getting all the invoices
export const getInvoices = async(req, res)=>{
    const{searchQuery} = req.query
    try{
        const allInvoices = await InvoiceModel.find({}).sort({_id:-1})
        res.status(200).json(totalCount);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// Creating a invoice
export const createInvoice = async(req, res)=>{
    const invoice = req.body
    const newInvoice = new InvoiceModel(invoice)

    try{
        await newInvoice.save()
        res.status(201).json(newInvoice)
    }
    catch(error){
        res.status(409).json(error.message)
    }
}

// getting a particular invoice
export const getInvoice = async(req, res)=>{
    const{id} = req.params

    try{
        const invoice = await InvoiceModel.findById(id)
        res.status(200).json(invoice)
    }
    catch(error){
        res.status(409).json(error.message)
    }
}

// deleting a invoice
export const deleteInvoice = async(req, res)=>{
    const{id} = req.params
    const invoice = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No invoice with this id')
    }
    await InvoiceModel.findByIdAndRemove(id)
    res.json({message:'Invoice deleted successfully'})
}

// updating invoice

export const updateInvoice = async(req, res)=>{
    const{id:_id} = req.params
    const invoice = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No invoice with this id')
    }
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(_id, {...invoice, _id}, {new:true})
    // The res. json() function sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON
    res.json(updatedInvoice)
}



