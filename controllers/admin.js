const path= require('path')
const multer= require('multer')
const PROJECT= require('../models/project.js')
const CLIENT= require('../models/clients.js')
const SUBSCRIBER= require('../models/email.js')
const CONTACTFORM= require('../models/userContact.js')




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  
  exports.upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|svg+xml|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
    },
  });



exports.handleGetHomePage= async(req,res)=>{
    try{
        const projects= await PROJECT.find({})
        const clients= await CLIENT.find({ })
        return res.status(200).render('index.ejs', { projects, clients })
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}


exports.handleGetAdminPage= async(req,res)=>{
    try{
        return res.status(200).render('admin.ejs')
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}


exports.handleGetAddProjectPage= async(req,res)=>{
    try{
        return res.status(200).render('projectAdd.ejs')
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}


exports.handleGetAddClientPage= async(req,res)=>{
    try{
        return res.status(200).render('clientAdd.ejs')
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}


exports.handleGetContactInfoPage= async(req,res)=>{
    try{
        const users= await CONTACTFORM.find({ })
        return res.status(200).render('contactInfo', { users })
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}
  

exports.handleGetSubscribersPage= async(req,res)=>{
    try{
        const emails= await SUBSCRIBER.find({ })
        return res.status(200).render('subscribeEmail.ejs', { emails })
    }catch(err){
        console.log(err)
        return res.status(404).end("Not Found")
    }
}
  
//   https://studentshub.fun

exports.handleAddProject= async (req,res)=>{
    try{
        const { project_name, project_header, project_location }= req.body
        const project_imageUrl = req.file ? `/public/${req.file.filename}` : null;
        console.log(project_imageUrl)

        const result= await PROJECT.create({
            project_name: project_name,
            project_header: project_header,
            project_location: project_location,
            project_imageUrl: "http://localhost:6001"+ project_imageUrl
          })
          if(!result){
            return res.status(400).json({ msg: "Project Not Added."})
          }
          console.log("Project Added Successfully.")
          return res.status(200).json({ msg: "Project Added Successfully"})
    }catch(err){
        console.log("Error in Add Project API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}


exports.handleAddClient= async (req,res)=>{
    try{
        const { client_name, client_remark, client_degignation  }= req.body
        const client_imageUrl= req.file ? `/public/${req.file.filename}` : null;
        console.log(client_imageUrl)

        const result= await CLIENT.create({
            client_name: client_name,
            client_remark: client_remark,
            client_degignation: client_degignation,
            client_imageUrl: "http://localhost:6001"+client_imageUrl
          })
          if(!result){
            return res.status(400).json({ msg: "Client Not Added."})
          }
          console.log("Client Added Successfully.")
          return res.status(200).json({ msg: "Client Added Successfully"})
    }catch(err){
        console.log("Error in Add Client API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}



exports.handlePostContactForms= async (req,res)=>{
    try{
        const { name, email, phone, city}= req.body
        const result= await CONTACTFORM.create({
            name: name,
            email: email,
            phone: phone,
            city: city
          })
          if(!result){
            return res.status(400).json({ msg: "Form Submited"})
          }
          console.log("Form Submitted Successfully.")
          return res.status(200).json({ msg: "Form Submitted Successfully"})
    }catch(err){
        console.log("Error in Contact Form Submission API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}


exports.handleGetAllProjects= async (req,res)=>{
    try{
        const result= await PROJECT.find({ })
        console.log(result)
        if(!result){
            return res.status(400).json({ msg: "No Projecs Found"})
        }
        return res.status(200).json({ msg: "Projecs.", allProjects: result})
    }catch(err){
        console.log("Error in Get All Projetcs API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}


exports.handleGetAllClients= async (req,res)=>{
    try{
        const result= await CLIENT.find({ })
        if(!result){
            return res.status(400).json({ msg: "No Clients Found"})
        }
        return res.status(200).json({ msg: "Clients.", allClients: result})
    }catch(err){
        console.log("Error in Get All Clients API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}


exports.handleGetAllContactForm= async (req,res)=>{
    try{
        const result= await CONTACTFORM.find({})
        if(!result){
            return res.status(400).json({ msg: "No Contacts Found"})
        }
        return res.status(200).json({ msg: "Contact Form.", allContacts: result})
    }catch(err){
        console.log("Error in Get All Contact Form API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}


exports.handlePostSubscriberEmail= async (req,res)=>{
    try{
        let date;
        const { email }= req.body
        console.log(email)
        const getCurrentDate = async () => {
            date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };
        date= await getCurrentDate()
        console.log(date)
        const result= await SUBSCRIBER.create({
            email: email,
            date: date,
        })
        if(!result){
            return res.status(400).json({ msg: "Subscriber Not Added."})
        }
        console.log("Subscriber Added Successfully.")
        return res.status(200).json({ msg: "Subscriber Added Successfully"})
    }catch(err){
        console.log("Error in Add Subscriber API", err)
        res.status(500).json({ msg: "Internal Server Error"})
    }
}
