const express = require("express");
const router = express.Router();

//Route for the Products Page
router.get("/products",(req,res)=>{

    res.render("products",{
        title:"Products",
        headingInfo: "Products",
        products : productModel.getAllproducts(),
    });

});