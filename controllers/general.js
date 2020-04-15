const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authentication");
const dashBoardLoader = require("../middleware/authorization");

//import userModel
const userModel = require('../model/user')
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
router.get("/dashboard",isAuthenticated,dashBoardLoader);

module.exports = router;