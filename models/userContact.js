const mongoose= require('mongoose')


const ContactDataSchema= new mongoose.Schema({
    name:{ type:String, require:true },
    email:{ type:String, require:true },
    phone:{ type:String, require:true},
    city:{ type:String, require:true}
})

const ContactData= mongoose.model('UserContactForm', ContactDataSchema)


module.exports= ContactData