import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import logo from '../LOGO.png';

import fb from '../fb.png';
import twitter from '../twitter.png';
import insta from '../insta.png';
import youtube from '../youtube.png';



import {
  getSomething,
  getAllProducts
} from '../api';

import{
  Header,
  Nav,
  Products,
  Product,
  Footer,
  Register,
	Login,
} from './';

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
			return localStorage.getItem('user');
		}
		else{
			return {};
		}
	});
	
	
	const fetchAndSetProducts = async () => {
		try{
		  const queriedProducts = await getAllProducts();
		  setProducts(queriedProducts);
    }
    catch(error){
    	console.log(error)
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
  }, []);

  return <>
    <Header>
      <img className="logo" src={logo}/>
      <Nav token={token} setToken={setToken} user={user} setUser={setUser}/>
    </Header>

    <div className="bulk">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
      <Route exact path='/products'>
      	<Products products={products} setProducts={setProducts}/>
      </Route>
			<Route exact path={`/products/:id`}>
				<Product products={products} />
			</Route>
			<Route exact path='/register'>
				<Register />
			</Route>

			<Route exact path='/login'>
				<Login setToken={setToken} setUser={setUser}/>
			</Route>
    </div>

    <Footer>
			<p className="copyright">Copyright © 1997 - 2021 GET BUFF Franchising, LLC.</p>
			<a href='https://www.facebook.com/marketplace/?ref=app_tab'><img className="socials" src={fb}/></a>
      <a href='https://twitter.com/?lang=en'><img className="socials" src={twitter}/></a>
      <a href='https://www.instagram.com/explore/tags/things/'><img className="socials" src={insta}/></a>
      <a href='https://youtu.be/9C_HReR_McQ'><img className="socials" src={youtube}/></a>
		</Footer>
  </>
}

export default App;