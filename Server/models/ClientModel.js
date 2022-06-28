// Models are responsible for creating and reading documents from the underlying MongoDB database.

const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    userId:[String],
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const ClientModel = mongoose.model('ClientModel', ClientSchema)
// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
// Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports=ClientModel