var cors = require('cors')
var jwt = require('jwt-simple');
const express = require("express");
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

var User = require('./models/User.js');
var Product = require('./models/Product.js');
var auth = require('./auth.js');

mongoose.Promise = Promise;

app.use(bodyparser.json());
app.use(cors());


//User API

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v');
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

//Products API

//Get all products
app.get('/products', async (req, res) => {
    try {
        var products = await Product.find({});
        res.send(products);
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//Get Product by user id

app.get('/user/products/:id', async (req, res)=>{
    try {
        var userId = req.params.id;
        var products =  await Product.find({ userId });
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

//Get product by id
app.get('/products/:id', async (req, res) => {
    try {
        var product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

//Add product
app.post('/products', (req, res) => {
    try {
        var productData = req.body;
        productData.UserId = req.userid;

        var product = new Product(productData);
        product.save((err, result) => {
            if(err){
                console.error('Error saving product!');
                return res.status(500).send({ message: 'Error saving product!'});
            }

            res.sendStatus(201);
        })
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//Update a product
app.put('/products/:id', async (req, res) => {
    try{
        var updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send(updatedProduct);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
})

//delete a product
app.delete('/products/:id', (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id, function(err) {
            if(err) return next(err);
            res.status(200).send({message: 'Product deleted successfully'});
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

mongoose.connect('mongodb://vicot:Salsisalsi27#@ds141633.mlab.com:41633/inventario_chapu', { useNewUrlParser: true}, (err) =>{
    if(!err){
        console.log('Connection succeded');
    }
})

app.listen(port, ()=>console.log('server is running at port 3000'));
app.use('/auth', auth.router);