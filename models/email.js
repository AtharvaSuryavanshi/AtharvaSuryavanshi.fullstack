const mongoose= require('mongoose')


const EmailDataSchema= new mongoose.Schema({
    email:{ type:String, require:true, unique:true },
    date: { type:String, require:true },
})

const SubscribersData= mongoose.model('Subscribers', EmailDataSchema)


module.exports= SubscribersData