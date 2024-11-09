const cors = require('cors');
const express= require('express')
const path= require('path')
const cookieParser = require('cookie-parser')
const  AdminRoute = require('./routes/admin.routes.js')
const UserRoute= require('./routes/user.routes.js')
const { connectToMongoDB }= require('../ASP/services/DBconnection')


const app= express();
const PORT= 6001
const DATABASE_URL='mongodb://localhost:27017/ASP'

connectToMongoDB(DATABASE_URL)
            .then(()=>{console.log("MongoDB Connected")})
            .catch((err)=>{console.log("Problem in connecting database",err)})


app.use(cors());                                           //  To allow cross origin requests 
app.use(cookieParser());                                   //  To parse cookies from req
app.use(express.json());                                   //  Middleware to parse JSON data
app.use(express.urlencoded({ extended: false }));          //  Middleware to parse URL-encoded data
// app.use(express.static("./public"));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");                              // using view engine to rander web-pages on server
app.set("views",path.join(__dirname,'views'))


app.use("/", UserRoute)
app.use("/admin", AdminRoute)


app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})