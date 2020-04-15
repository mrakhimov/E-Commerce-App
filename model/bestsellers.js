const productModel = require("../model/products");

const bestsellers =
{
    fakeDB:[],

    init()
    {
 
    },

    getAllBestSellers()
    {
       let temp = [];
       let allproducts = []
       allproducts = productModel.getAllproducts();

        for(let i=0;i<allproducts.length;i++){
            if(allproducts[i].bestseller)
            {
               temp.push(allproducts[i]);
            }
        }

    return temp;
    },

}

bestsellers.init();
module.exports = bestsellers;