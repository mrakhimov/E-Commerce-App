const products =
{
    fakeDB:[],

    init()
    {
        this.fakeDB.push(
        {
            name:'White Quartz Wrist Watch',
            description: 'Simple dial design women\'s fashion watches exquisite luxury female quartz wristwatches women dress watch leather ladies clock',
            category: 'Watches',
            thumb:`/img/1.png`,
            price: `$ 29.95`,
            bestseller: true,
            link:`#`
        });

        this.fakeDB.push(
        {
            name:'Rose Gold Watch',
            description: 'Top Brand Luxury Magnetic Starry Sky Lady Wrist Watch Mesh Female Clock For Dropship relogio feminino',
            category: 'Watches',
            thumb:`/img/2.png`,
            price: `$ 35.96`,
            bestseller: false,
            link:`#`
        });
        this.fakeDB.push(
        {
            name:'Makeup Brushes',
            description: 'Luxury Champagne Makeup Brushes Set For Foundation Powder Blush Eyeshadow Concealer Lip Eye Make Up Brush Cosmetics Beauty Tools',
            category: 'Beauty',
            thumb:`/img/3.png`,
            price: `$ 15.95`,
            bestseller: true,
            link:`#`
        });
        
        this.fakeDB.push(
        {
            name:'Eyelashes ',
            description: 'Visofree Mink Lashes 3D Mink Eyelashes 100% Cruelty free Lashes Handmade Reusable Natural Eyelashes Popular False Lashes Makeup',
            category: 'Beauty',
            thumb:`/img/4.png`,
            price: `$ 16.99`,
            bestseller: false,
            link:`#`
        });
        this.fakeDB.push(
        {
            name:'Long Sleeve Sweater',
            description: 'Dress Women\'s Irregular Hem Casual Autumn Winter Dress Women O-neck A Line Short Mini Knitted Dresses',
            category: 'Women\'s Fashion',
            thumb:`/img/5.png`,
            price: `$ 59.85`,
            bestseller: true,
            link:`#`
        });

        this.fakeDB.push(
        {
            name: `Knitted Tracksuit`,
            description: 'Turtleneck Women Knitted Sets Two Piece Set Top and Pants Women 2 Piece Set Casual Suit Outfits',
            category: 'Women\'s Fashion',
            thumb:`/img/6.png`,
            price: `$ 36.43`,
            bestseller: false,
            link:`#`
        });
        this.fakeDB.push(
        {
            name:'Pendant Necklace',
            description: 'Hot Tree of Life Crystal Round Small Pendant Necklace Gold Silver Colors Bijoux Collier Elegant Women Jewelry Gifts',
            category: 'Jewellery',
            thumb:`/img/7.png`,
            price: `$ 11.99`,
            bestseller: true,
            link:`#`
        });
        
        this.fakeDB.push(
        {
            name:'Bracelet',
            description: 'Stainless Steel Tree of Life Charms Bracelet Women Multi Crystal Beads Pendant Popcorn Chain Bracelet Fashion Jewelry Gifts 2019',
            category: 'Jewellery',
            thumb:`/img/8.png`,
            price: `$ 13.99`,
            bestseller: false,
            link:`#`
        }); 
       
    },

    getAllproducts()
    {

        return this.fakeDB;
    },

    

}

products.init();
module.exports = products;