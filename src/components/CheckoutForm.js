import { CardElement } from "@stripe/react-stripe-js";
import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import Product from "./Product";
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements} from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy');
// import {CardElement} from '@stripe/react-stripe-js';


// ****************************************************************************************************************************************






{/* <CardElement
options={{
    style: {
    base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
        color: '#aab7c4',
        },
    },
    invalid: {
        color: '#9e2146',
    },
    },
}}
/> */}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

                

              

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);


 

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;