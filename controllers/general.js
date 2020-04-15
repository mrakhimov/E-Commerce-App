const express = require("express");
const router = express.Router();

const categoryModel = require("../model/categories");
const bestsellerModel = require("../model/bestsellers");

//Route for the Home Page
router.get("/",(req,res)=>{

    res.render("index",{
        title:"Home",
        headingInfo: "Limited Time Promotion",
        categories : categoryModel.getAllCategories(),
        bestsellers : bestsellerModel.getAllBestSellers()
    });

});

// Handle dashboard only if authenticated
router.get("/dashboard",(req,res)=>{
    /* TODO: Pull user data from the database and render the results in a dashboard */
    /*userModel.find()
    .then( (data) => {

    })     
    .catch( err => {
        console.log(`Error retrieving data from a database: ${err}`);
    })
    */
    res.render("dashboard");
});

module.exports = router;