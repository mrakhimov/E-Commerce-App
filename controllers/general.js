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

// Filter results by category
router.post("/dashboard", isAuthenticated, (req,res) => {
    productsModel.find({category: req.body.category})
        .then((products)=>{
            //Filter out the information that you want from the array of documents that was returned into
            //a new array
            //Array 300 documents meaning that the array has 300 elements 
            const filteredItems =  products.map(item=>{
                    return {
                        id: item._id,
                        name: item.name,
                        description:item.description,
                        category : item.category,
                        price : item.price,
                        bestseller: item.bestseller,
                        link: item.link,
                        thumb: item.thumb,
                        quantity: item.quantity
                    }
            });
    
            res.render("clerkDashboard",{
               data : filteredItems
            });
    
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
});

module.exports = router;