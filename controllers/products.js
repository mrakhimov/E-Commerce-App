const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../middleware/authentication");
const productsModel = require("../model/products");

//Route for the Products Page
router.get("/list",(req,res)=>{
    productsModel.find()
    .then((products)=>{
        //Filter out the information that you want from the array of documents that was returned into
        //a new array
        //Array 300 documents meaning that the array has 300 elements 
        const filteredItems =   products.map(item=>{
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

        res.render("products",{
           products : filteredItems
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});
//Route to direct use to Add Products form
router.get("/add",isAuthenticated,(req,res)=>
{
    if (req.session.user.role=="Clerk") {
        res.render("products-add");
    }
    else {
        res.redirect("list");
    }
    
    
});
//Route to process user's request and data when the user submits the add task form
router.post("/add",isAuthenticated,(req,res)=>
{
    const newProduct = {
        name : req.body.name,
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        bestseller : req.body.bestseller == 'true',
        quantity: req.body.quantity
    }

    /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
        in the form of an object(object literal)
        2. From the instance, you call the save method
    */

     const product =  new productsModel(newProduct);
     product.save()
     .then(()=>{
        req.files.productPic.name = `${product._id}${path.parse(req.files.productPic.name).ext}`;
        console.log(req.files.productPic.name);
        req.files.productPic.mv(`./public/img/${req.files.productPic.name}`)
        .then(()=>{
            productsModel.updateOne({_id:product._id},{
                thumb: req.files.productPic.name
            })
            .then(()=>{
                res.redirect(`/products/list`)
            })
            .catch(err=>console.log(`Update to database failed :${err}`));
        })
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

module.exports = router;