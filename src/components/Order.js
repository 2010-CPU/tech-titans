import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById, cancelOrder, completeOrder } from '../api';

const Order = ({order}) => {

	if (!order){
		return <div>NO ORDER</div>
	}

	console.log(order.id, "##################################")
    const handleCancel = async (orderId) => {
		console.log(orderId, 'orderid')
		orderId = order.id;
		console.log(orderId, 'assigned order id')
        console.log("I am starting to delete the order")
    		if(!orderId) {
        	return alert("There is no order to delete")
    			}else{
    				try{
       					 await cancelOrder(orderId)
    				}catch(error){
        			throw error;
   				    }
    			}
	}


		const handleComplete = async(orderId) => {
			console.log('I am starting to handle the complete order')
			if(!orderId) {
				return alert("there is no order to complete")
			}else {
			await completeOrder(orderId)
			}
		}


	return <div>
	
		<div className='single-order'>
			<h3>Order id: {order.id}</h3>
			<h3>Date Placed: {order.datePlaced}</h3>
			<h3>Status: {order.status}</h3>
			<h3>Products:</h3>
			<button>Cancel Order</button>
			<button>Complete Order</button>
			<ul>
				{order.products && order.products.map(product => {
					return <div className='order-product' key={product.id}>
						<h4>Product ID: {product.id}</h4>
						<h4>Price: {product.price}</h4>
						<h4>Quantity: {product.quantity}</h4>
					</div>
				})}
			</ul>
		</div>
	
	</div>
};

export default Order;