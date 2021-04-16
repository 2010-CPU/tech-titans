import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import {
  getSomething,
  getAllProducts,
  getCart,
} from '../api';

import{
  Header,
  Home,
  Products,
  Product,
  Footer,
  Register,
	Login,
	MyAccount,
	Order,
	Orders,
	Cart,
	CheckoutForm
} from './';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy'
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
	const [token, setToken] = useState( () => {
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token')
		} else {
			return ''
		}
	});
	const [user, setUser] = useState( () => {
		if (localStorage.getItem('user')) {
			const user = localStorage.getItem('user');
			const userObj = JSON.parse(user);
			return userObj;
		}
		else{
			return {};
		}
	});
	const [orders, setOrders] = useState([]);

	const [cart, setCart] = useState({products: []});

	const fetchAndSetProducts = async () => {
		try{
		  const queriedProducts = await getAllProducts();
		  setProducts(queriedProducts);
    }
    catch(error){
    	console.log(error)
    }
	};
	const fetchAndSetCart = async (token) => {
		try{
			if (!token){
				return
			}
			const queriedCart = await getCart(token);
			if(queriedCart){
				setCart(queriedCart);
			}
		}
		catch(error){
			console.log(error);
		}
	};
	
	
  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
		fetchAndSetProducts();
		fetchAndSetCart(token);
  }, [token]);

  return <>
    <Header token={token} setToken={setToken} user={user} setUser={setUser}/>

    <div className="bulk">

			<Route exact path='/'>
				{<Home user={user} />}
			</Route>
			<Route exact path='/products'>
				<Products token={token} products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>
			</Route>

			<Route exact path={`/products/:id`}>
				<Product token={token} products={products} />
			</Route>

			<Route exact path='/register'>
				<Register setToken={setToken} setUser={setUser}/>
			</Route>

			<Route exact path='/login'>
				<Login setToken={setToken} setUser={setUser}/>
			</Route>

			<Route exact path ='/myaccount'>
				<MyAccount token={token} user={user} orders={orders} setOrders={setOrders} />
			</Route>
			
			<Route exact path ='/orders'>
				<Orders orders={orders} setOrders={setOrders} token={token} user={user} setCart= {setCart}/>
			</Route>
			
			<Route exact path ='/orders/:orderId'>
				<Order token = {token} setCart= {setCart} />
			</Route>

			<Route exact path ='/cart'>
				<Cart cart={cart} setCart={setCart} token={token} fetchAndSetCart={fetchAndSetCart}/>
			</Route>
			
			<Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
    </div>

    <Footer/>
  </>
}

export default App;
