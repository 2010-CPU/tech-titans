import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
  getSomething,
  getAllProducts
} from '../api';

import{
Products,
Product,
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

  return (
  <Router>
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
      
      <Link to='/products'>Products</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      
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
  </Router>
  );
}

export default App;
