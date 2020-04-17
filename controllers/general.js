const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authentication");
const dashBoardLoader = require("../middleware/authorization");

//import categories and products

const categoryModel = require("../model/categories");
const productsModel = require("../model/products");
const cartModel = require("../model/cart");
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
    if (req.body.category == "all") {
        productsModel.find()
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
    }
    else {
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
    }


    
});

// Handle add to cart
router.put("/cart/:id", isAuthenticated, (req,res) => {
    // If cart is not empty
    if(!req.session.cart) {
        productsModel.findById(req.params.id)
        .then((product)=>{
            product.price = product.price * Number(req.body.quantity);
            let newCart = {
                products: [],
                products_qty: [],
                userid: req.session.user._id,
                username : req.session.user.name,
                useremail: req.session.user.email,
                total_amount: product.price,
                total_items: Number(req.body.quantity) ,
            };

            newCart.products.push(product);
            newCart.products_qty.push(Number(req.body.quantity));
            const cartObj = new cartModel(newCart);
            cartObj.save()
            .then(()=> {
                req.session.cart=cartObj;
                res.redirect("/cart");
            })
            .catch(err => {
                console.log(`Error on saving to database: ${err}`);
            });
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}\n\n`));
    }
    // Update existing cart
    else {
        let quantity_added_to_cart = Number(req.body.quantity);
        let total_price_on_the_cart = 0;
        let total_items_on_the_cart = 0;
        productsModel.findById(req.params.id)
        .then((product)=>{
            let product_price = product.price;

            product.price = product_price * Number(req.body.quantity);

            cartModel.findById(req.session.cart._id)
            .then((cart) => {
                total_items_on_the_cart = cart.total_items;
                total_items_on_the_cart += quantity_added_to_cart;
                total_price_on_the_cart = cart.total_amount;
                total_price_on_the_cart += (product_price * quantity_added_to_cart);
                cartModel.updateOne({_id:req.session.cart._id}, { 
                    $set: {  total_items: total_items_on_the_cart, total_amount: total_price_on_the_cart },
                    $push: { products: product, products_qty:quantity_added_to_cart}
                })
                .then(()=>{
                    res.redirect("/cart");
                })
                .catch(err=>console.log(`Error happened when updating data from the database :${err}`));
            }).catch(err=>console.log(`Error happened when pulling from the database :${err}`));
           
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
    }
});

router.get("/cart", isAuthenticated, (req,res) => {
    if(!req.session.cart) {
        const err = "Your cart is empty";
        res.render("cart", {
            err
        });
    }
    else {
        cartModel.findOne({userid: req.session.user._id})
        .then((cart)=>{
            let {products, products_qty, total_items, total_amount } = cart;
            res.render("cart", {
                products, products_qty, total_items, total_amount
            });
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
    }
    
});



module.exports = router;