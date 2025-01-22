const express = require('express');
const app = express();
var mysql = require('mysql2');

alert('ooo');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"practice"
});

connection.connect(function(error){
    if(error){
        throw error;
    }
    console.log("connection established");
    connection.query("show tables",function(error,result){
        if(error){
            throw error;
        }
        console.log(result);
    });
});
// const fetchThirdPartyData = require('../API/data/products');
// const customProductData = require('../API/data/customData')
// console.log('products_data', fetchThirdPartyData);
const productsRoute = require('./data/routes/products');

app.use('/custom/data', productsRoute);
// custom/data
// custom/data
// custom/data
app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// let productData = [];
// fetchThirdPartyData()
//         .then(thirdPartyData => {
//             productData = thirdPartyData;
//         });

// app.get('/', (req, res) => {
//     res.json(productData);
// });

// app.get('/custom/data',(req,res) => {
//     res.status(200).json({'success' : true, 'data' : customProductData})
// })

// app.get('/custom/data/:id',(req,res) => {
//     console.log('request',req.params);
//     const {id} = req.params;
//     console.log('idddd',customProductData);
//     const filtredPorduct = customProductData.filter((product) => {
//         if(product.id == id){
//             return product;
//         }
//     })
//     res.status(200).json({success: 'true', data: filtredPorduct});
// })

// app.post('/custom/data',(req,res) => {
//     console.log(req.body);
//     customProductData.push(req.body);

//     res.json({success: "true", data: customProductData, count: customProductData.length});
// })



app.listen(5000, () => {
    console.log('Server is listening on 5000');
});
