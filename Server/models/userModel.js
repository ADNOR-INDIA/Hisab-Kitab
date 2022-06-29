// This model will be required when new user will get signup, following things will be required from user end ans info.
// Models are responsible for creating and reading documents from the underlying MongoDB database.
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
})

const User = mongoose.model('User', userSchema)
// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
// Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports = User