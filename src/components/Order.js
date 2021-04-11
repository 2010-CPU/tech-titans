import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById } from '../api/index.js';


const Order = ( {orders, order}) => {
	console.log('I like puppies')
	const {id} = useParams();
	console.log(id)
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

	// if(order){
	// 	console.log(order, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOorder')
	// 	return <>
	// 		<h3 className='orders-list-name'>
	// 			<Link to={`/orders/${order.id}`}> {order.id} </Link>
	// 		</h3>
	// 		<ul>
	// 			<li>status: {order.status}</li>
	// 			<li>ordered by:  {order.userId }</li>
	// 			<li>date placed: ${order.datePlaced}</li>
	// 		</ul>
	// 	</>
	// }else{
console.log(singleOrder, 'SSSSSSSSSSSSSSSSSSSSingleOOOOOOOOOOOOOOrder')
console.log(singleOrder.products, '***************************')
// console.log(anOrder, 'aaaaaaaaaaaaaaaaaaaan ordere')
// console.log(theOrder, 'TTTTTTTTTTTTTTTTTTTTTtttheOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRR')

const productOrdered = () => {
	if(!singleOrder.products) {
		return;
	}else{
		singleOrder.products.map(product => {
			console.log(product, '88888888888888888888888')
			return <div>
				<h3>Product id: {product.id}</h3>
				<h3>Price:  {product.price}</h3>
				<h3>Quantity {product.quantity}</h3>
			</div>
		})
	}
}


	return <div key={id}>
			<h3 className='orders-list-name'>{singleOrder.id}</h3>
             <ul>
				<li>STATUS:   {singleOrder.status}</li>
				<li>DATE PLACED:     ${singleOrder.datePlaced}</li>
			</ul>
			<h2>Products Ordered: </h2>
				<div>{!singleOrder.products ? "" : productOrdered()}</div>
				

			
				
				</div>	

			
		

};




export default Order;