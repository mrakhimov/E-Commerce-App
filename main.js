//imports
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//creation of app object
const app = express();


// load env variable file
require('dotenv').config({path:"./config/keys.env"});
//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
//loading static assests middleware
app.use(express.static("public"));

// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> {
    console.log("Connected to Database");
})
.catch(err => {
    console.log(`Error occured when connecting to database: ${err}`);
})


// load controllers
const generalController = require("./controllers/general");
const authController = require("./controllers/auth");
const productsConroller = require("./controllers/products");

// map controllers
app.use("/", generalController);
app.use("/products", productsConroller);
app.use("/auth", authController);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`The Server is now running at port ${PORT}`);
});

