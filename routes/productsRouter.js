const express = require('express');
const { getAllProducts, getProductById } = require('../db/products');
const productsRouter = express.Router();


productsRouter.get('/', async(req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.send(allProducts)
    } catch (error) {
        next(error)
    }
});

productsRouter.get('/:id', async(req, res, next) => {
	const { id } = req.params;
	console.log('going to get a specific product');
	try{
		const product = await getProductById({id});
		console.log(product);
		res.send(product);
	}
	catch(error){
		next(error)
	}
});

module.exports = productsRouter;
