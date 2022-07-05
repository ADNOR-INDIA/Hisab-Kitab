// Models are responsible for creating and reading documents from the underlying MongoDB database.
import mongoose  from 'mongoose'

const ProfileSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:String,
    contactAddress:String,
    PaymentDetails:String,
    logo:String,
    website:String,
    userId:[String],
})

const Profile = mongoose.model('Profile', ProfileSchema)
// Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
// Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
export default ProfileSchema