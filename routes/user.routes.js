const express= require('express')
const router= express.Router();
const Admin= require('../controllers/admin.js')




router.get("/", Admin.handleGetHomePage)

router.get("/all-projects", Admin.handleGetAllProjects)

router.get("/all-clients", Admin.handleGetAllClients)

router.post("/contact-form", Admin.handlePostContactForms)

router.post("/add-subscriber", Admin.handlePostSubscriberEmail)


module.exports= router