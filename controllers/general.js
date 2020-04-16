const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authentication");
const dashBoardLoader = require("../middleware/authorization");

//import categories and products

const categoryModel = require("../model/categories");
const productsModel = require("../model/products");
//Route for the Home Page
router.get("/",(req,res)=>{
    productsModel.find({ bestseller: true })
    .then((products)=>{

        const bestsellers = products.map(item=>{
                return {
                    id: item._id,
                    name: item.name,
                    description:item.description,
                    category : item.category,
                    price : item.price,
                    bestseller: item.bestseller,
                    link: item.link,
                    thumb: item.thumb
                }
        });

        res.render("index",{
            title:"Home",
            headingInfo: "Limited Time Promotion",
            categories : categoryModel.getAllCategories(),
            bestsellers : bestsellers
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});

// Handle dashboard only if authenticated
router.get("/dashboard",isAuthenticated,dashBoardLoader);

module.exports = router;