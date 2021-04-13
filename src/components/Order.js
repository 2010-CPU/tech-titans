import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById } from '../api/index.js';


const Order = ({order, orders}) => {
	const {id} = useParams();
	console.log(id, 'this is  the id')
	const [singleOrder, setSingleOrder ] = useState({});


	const getOrder = async (id) => {
		try{
			const theOrder = await getOrderById(id);
            console.log(theOrder, 'this is the Order')
			return theOrder;
		}catch(error){
			throw error;
		}
	}

	useEffect( () => {
		console.log('lllllllllllllllllllllllllllllllllllllllllll')
		const getAndSetOrder = async () => {
			const anOrder = await getOrder(id)
			console.log(anOrder, 'this is an order')
			if(anOrder){
			 setSingleOrder(anOrder)
			}
		}
		if(id){
			getAndSetOrder();
		}
	}, [id])

	if(order){
		return <>
			<h3 className='products-list-name'>
				<Link to={`/orders/${order.id}`}> Order No:   {order.id} </Link>
			</h3>
			<ul>
			<h3>Product id: {order.productId}</h3>
			<h3>Price:  {order.price}</h3>
			<h3>Quantity {order.quantity}</h3>
		
			</ul>
		</>
	}else{

console.log(singleOrder, 'SSSSSSSSSSSSSSSSSSSSingleOOOOOOOOOOOOOOrder')
console.log(singleOrder.products, '***************************')


const productOrdered = () => {
	if(!singleOrder.products) {
		return;
	}else{
		singleOrder.products.map(product => {
			console.log(product, '88888888888888888888888')
			return <div>
				<h1>RETURN</h1>
				<h3>Product id: {product.productId}</h3>
				<h3>Price:  {product.price}</h3>
				<h3>Quantity {product.quantity}</h3>
			</div>
		})
	
	}
}


	return <div key={id}>
			<h3 className='orders-list-name'>Order id:        {singleOrder.id}</h3>
             <ul>
				<li>STATUS:   {singleOrder.status}</li>
				<li>DATE PLACED:     ${singleOrder.datePlaced}</li>
				
			</ul>
			<h2>Products Ordered: {productOrdered} </h2>



			
				
				</div>	

			
	};		

};




export default Order;