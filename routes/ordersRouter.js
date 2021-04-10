const express = require('express');
const { getAllOrders, getOrderById, getOrdersByUser, updateOrder, completeOrder, cancelOrder } = require('../db/orders');
const { addProductToOrder, getOrderProductById, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const ordersRouter = express.Router();

ordersRouter.get('/', async(req, res, next) => {
	try{
		const orders = await getAllOrders();
		res.send(orders);
	}
	catch(error){
		next(error);
	}
});

ordersRouter.get('/:id', async(req, res, next) => {
	const { id } = req.params;
	try{
		const order = await getOrderById(id);
		res.send(order);
	}
	catch(error){
		next(error);
	}
});

ordersRouter.patch('/:orderId', requireUser, async(req, res, next) => {
	const {status, userId} = req.body;
    const {id} = req.params;
    console.log('updating order');
    try{
        const order = await updateOrder({id: id, status: status, userId: userId});
        res.send(order);
    }catch(error){
        next(error);
    }
});

ordersRouter.delete('/:orderId', requireUser, async(req, res, next) => {
	try{
        const {id} = req.params;
        const order = await cancelOrder(id);
        console.log('deleting order');
        res.send({message: 'deleted', order});
    }catch(error){
        next(error);
    }
});

//needs to add order_product to order
ordersRouter.post('/:orderId/products', async(req, res, next) => {
	const { orderId } = req.params;
    const {productId, price, quantity} = req.body;
	console.log('adding order_product');
	try{
		const order_product = await getOrderProductById(productId);
		if(order_product){
            console.log('order_product retrieved', order_product);
            const updated = await updateOrderProduct({id: order_product.id, quantity: quantity});
		    res.send({updated, message: 'updated'});
        }else{
            const newOrderProduct = await addProductToOrder({orderId, productId, price, quantity});
            res.send({newOrderProduct, message: 'new order_product'});
        }
	}
	catch(error){
		next(error);
	}
});

module.exports = ordersRouter;
