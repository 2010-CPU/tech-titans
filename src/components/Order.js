import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

import { getOrderById, cancelOrder, completeOrder, removeFromCart } from '../api';

const Order = ({order, type, token, setCart, cart, fetchAndSetCart}) => {

	if (!order){
		return <div>NO ORDER</div>
	}
    const handleCancel = async (orderId, token) => {
    		if(!order) {
        	return alert("There is no order to delete")
    			}else{
    				try{
       					 await cancelOrder(orderId, token)
					 	 setCart('')
    				}catch(error){
        			throw error;
   				    }
    			}
	}


		const handleComplete = async(orderId, token) => {
			if(!orderId) {
				return alert("there is no order to complete")
			}else {
				try{
					await completeOrder(order.id, token)
					setCart('')
			}catch(error) {
				throw error;
			}
		} 
	}
    
	const handleProductRemove = async (id) => {
		const removed = await removeFromCart(id);
		await fetchAndSetCart(token);
	};
	useEffect(()=>{
		if(type==='cart'){fetchAndSetCart(token)}
	} , []);
	return <div>
	
		<div className='single-order'>
			<h3>Order id: {order.id}</h3>
			<h3>Date Placed: {order.datePlaced}</h3>
			<h3>Status: {order.status}</h3>
			<h3>Products:</h3>
			{token && type === 'cart' ? <button onClick = {() => {handleCancel(Number(order.id), token)}}>Cancel Order</button> : ''}
			{token && type === 'cart' ? <button onClick = {() => {handleComplete(order.id, token)}}>Complete Order</button>  : ''}
			<ul>
				{order.products.map(product => {
					return <div className='order-product' key={product.id}>
						<h4>Product Name: {product.name}</h4>
						<h3>Product ID: {product.productId}</h3>
						<h3>Price: {product.price}</h3>
						<h3>Quantity: {product.quantity}</h3>
						{type === 'cart' ? <button className="productRemove" onClick = {() => {handleProductRemove(product.id)}}>Remove</button> : ''}
					</div>
				})}
			</ul>
		</div>
	
	</div>
};

export default Order;