const express = require("express");
const router = express.Router();

//Route for the Home Page
router.get("/",(req,res)=>{

    res.render("index",{
        title:"Home",
        headingInfo: "Limited Time Promotion",
        categories : categoryModel.getAllCategories(),
        bestsellers : bestsellerModel.getAllBestSellers()
    });

});
