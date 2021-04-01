const express = require('express');
const { getAllOrders, getCartByUser, createOrder, getOrdersByUser } = require('../db/orders');
const usersRouter = require('./usersRouter');
const ordersRouter = express.Router();
const {requireUser} = require('./utils');

ordersRouter.get('/', async(req, res, next) => {
    const {isAdmin} = req.body;
    if(isAdmin === true) {
    try{
        const orders= await getAllOrders;
        return orders
    }catch(error) {
        next(error)
    }
}
});

ordersRouter.get('/cart', requireUser, async(req, res, next) => {
    const {status} = req.params
    if(status === isCreated) {
        try {
            const cart = await getCartByUser;
            return cart
        }catch(error) {
            next(error)
        }
    }
})

ordersRouter.post('/', requireUser, async(req, res, next) => {
    try {
        const newOrder = await createOrder();
        newOrder.status = 'created';
        return newOrder;
    }catch(error) {
        next(error);
    }

})

ordersRouter.get('/users/:userId/orders', requireUser, async(req, res, next) => {
    const { userId } = req.params
    if (user.id === userId) {
        try {
            const orderByUser = await getOrdersByUser;
            return orderByUser;
        }
    }


});

module.exports = ordersRouter;