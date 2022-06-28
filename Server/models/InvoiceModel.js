const mongoose = reuire('mongoose')

const InvoiceSchema = mongoose.Schema({
    dueDate:Date,
    currency:String,
    items:[{
        itemName:String,
        unitPrice:String,
        quantity:String,
        discount:Sting
    }],
    rates:String,
    vat:Number,
    total:Number,
    subTotal:Number,
    notes:String,
    status:String,
    invoicenumber:String,
    type:String,
    creater:[String],
    totalAmountReceived:Number,
    client:{
        name:String,
        email:String,
        phone:String,
        address:String
    },
    paymentRecords:[{
        amountPaid:Number,
        datePaid:Date,
        paymentMethod:String,
        note:String,
        paidBy:String
    }],
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const InvoiceModel = mongoose.model('InvoiceModel', InvoiceSchema)
//Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
// Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports=InvoiceModel