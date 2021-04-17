import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.PUBLISHABLE_KEY)
const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

 
const TakeMoney = ({token}) => {


fetch('/create-checkout-session', {
  method: 'POST',
})
.then(function(response) {
  return response.json();
})
.then(function(session) {
  return stripe.redirectToCheckout({ sessionId: session.id });
})
.then(function(result) {

  if (result.error) {
    alert(result.error.message);
  }
});


   const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }


 {
    return <>
  
      <StripeCheckout
        token={token}
        // stripePromise={stripePromise}
        // stripeKey={process.env.PUBLISHABLE_KEY}
      />
      </>
  }
}


export default TakeMoney;