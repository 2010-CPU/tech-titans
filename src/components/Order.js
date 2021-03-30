import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById } from '.../db/orders.js';



const Order = ({orders, order}) => {
	const {id} = useParams();
	const [singleOrder, setSingleOrder ] = useState({});

	const getOrder = async (id) => {
		try{
			const theOrder = await getOrderById(id);
			return theOrder;
		}catch(error){
			throw error;
		}
	}

	useEffect(async () => {
		const anOrder =await getOrder(id)
		if(anOrder){
	   setSingleOrder(anOrder)
		}
	}, [id])

	if(order){
		return <div key={order.id}>
		<h3 className='orders-list-name'>Order number: {order.id}</h3>
		<ul>
			<li>ordered by: {order.userId}</li>
			<li>status: {order.status}</li>
			<li>date placed:  ${order.datePlaced}</li>
		</ul>
	</div>
	}else{


	return <div key={id}>
				<h3 className='orders-list-name'>{singleOrder.name}</h3>
				<ul>
                <li>ordered by: {singleOrder.userId}</li>
			    <li>status: {singleOrder.status}</li>
			    <li>date placed:  ${singleOrder.datePlaced}</li>
				</ul>
			</div>
	}
};

export default Order;