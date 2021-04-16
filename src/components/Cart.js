import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order, TakeMoney} from './';
import { getCart, swipeRedirect } from '../api';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy');
const stripekey = 'pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy'


const Cart = ({cart, setCart, token, fetchAndSetCart}) => {

	// const handlePay = async () => {
	// 	await swipeRedirect()
	// }

	// const handlePay = async (event) => {
	// 	const stripe = await stripePromise;
	// 	const response = await fetch('/create-checkout-session', { method: 'POST' });
	// 	// console.log(response, 'this is the response')
	// 	// const session = await response.json();
	// 	// console.log(session, 'this is the session')
	// 	const result = await stripe.redirectToCheckout({sessionId: session.id});
	// 	console.log(result, 'this is the result')
	
	// 	if (result.error) {
	// 		throw new Error(result.error.message)
	// 	}
	//   };
	return <>
	<Order order={cart} type={'cart'} fetchAndSetCart={fetchAndSetCart} token={token} setCart={setCart}/>
	<TakeMoney token={token} />
	</>
};

export default Cart;
