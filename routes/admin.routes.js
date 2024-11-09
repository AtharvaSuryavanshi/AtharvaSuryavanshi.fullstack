const express= require('express')
const router= express.Router();
const Admin= require('../controllers/admin.js')
const { upload }= require('../controllers/admin.js')



router.get("/", Admin.handleGetAdminPage)

router.get("/all-subcribers", Admin.handleGetSubscribersPage)

router.get("/all-contactform", Admin.handleGetAllContactForm)

router.get("/contact-info", Admin.handleGetContactInfoPage)

router.get("/add-projects", Admin.handleGetAddProjectPage)

router.get("/add-clients", Admin.handleGetAddClientPage)


router.post("/add-projects", upload.single('project_image'), Admin.handleAddProject)

router.post("/add-clients", upload.single('client_image'), Admin.handleAddClient)


module.exports= router