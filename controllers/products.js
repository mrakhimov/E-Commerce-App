const express = require("express");
const router = express.Router();

const productModel = require("../model/products");

//Route for the Products Page
router.get("/list",(req,res)=>{

    res.render("products",{
        title:"Products",
        headingInfo: "Products",
        products : productModel.getAllproducts(),
    });

});

module.exports = router;