const mongoose= require('mongoose')


const ClientDataSchema= new mongoose.Schema({
    client_name:{ type:String, require:true, unique:true },
    client_remark:{ type:String, require:true },
    client_degignation:{ type:String},
    client_imageUrl:{ type:String}
})

const ClientData= mongoose.model('Clients',ClientDataSchema)


module.exports= ClientData