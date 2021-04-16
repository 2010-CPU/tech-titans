const express = require('express');
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy)

// stripeRouter.get('/', (req, res) => {
//     res.send('this is the stripe console.log')
// })



// (async () => {
//     console.log(await stripe.plans.list())
// })();

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51IgfNNBiothv58cf1OMUUdoXVz5akce35IHlHHrfkcz3hmB2jq3HPYomKuN9Ed8D242645yU8KyqmIPFsrABUDbM00YcTM2dDt')

stripeRouter.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});


// stripeRouter.listen(4242, () => console.log(`Listening on port ${4242}!`));