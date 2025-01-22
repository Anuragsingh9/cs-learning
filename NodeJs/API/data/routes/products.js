const express = require('express');
const app = express();
const router = express.Router();
const fetchThirdPartyData = require('../../data/products');
const customProductData = require('../customData');
app.use(express.json());
let productData = [];
fetchThirdPartyData()
        .then(thirdPartyData => {
            productData = thirdPartyData;
        });

router.get('/', (req, res) => {
    res.json(productData);
});

router.get('/',(req,res) => {
    res.status(200).json({'success' : true, 'data' : customProductData})
});

router.get('/:id',(req,res) => {
    console.log('request',req.params);
    const {id} = req.params;
    console.log('idddd',customProductData);
    const filtredPorduct = customProductData.filter((product) => {
        if(product.id == id){
            return product;
        }
    })
    res.status(200).json({success: 'true', data: filtredPorduct});
});

router.post('/',(req,res) => {
    console.log(req.body);
    customProductData.push(req.body);

    res.json({success: "true", data: customProductData, count: customProductData.length});
});

module.exports = router;