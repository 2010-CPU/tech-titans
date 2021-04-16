const express = require('express');
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy)

stripeRouter.get('/', (req, res) => {
    res.send('this is the stripe console.log')
})

stripeRouter.listen(4242, () => ('stripe api route is working'))

(async () => {
    console.log(await stripe.plans.list())
})();