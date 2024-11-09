const mongoose= require('mongoose')


const ProjectDataSchema= new mongoose.Schema({
    project_name: { type:String, require:true },
    project_header :{ type:String, require:true },
    project_location: { type:String},
    project_imageUrl: { type:String}
})

const ProjectData= mongoose.model('Projects', ProjectDataSchema)


module.exports= ProjectData