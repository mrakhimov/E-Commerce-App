//imports
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const categoryModel = require("./model/categories");
const productModel = require("./model/products");
const bestsellerModel = require("./model/bestsellers");

const sgMail = require('@sendgrid/mail');

// load env variable file
require('dotenv').config({path:"./config/keys.env"});
//creation of app object
const app = express();


//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
//loading static assests middleware
app.use(express.static("public"));
//setup email
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`The Server is now running at port ${PORT}`);
});

