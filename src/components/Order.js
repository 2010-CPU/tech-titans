import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById } from '../api/index.js';

const Order = ({orders, order}) => {
	const {id} = useParams();
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
		const getAndSetOrder = async () => {
			const anOrder = await getOrder(id)
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
			<h3 className='orders-list-name'>
				<Link to={`/orders/${order.id}`}> {order.id} </Link>
			</h3>
			<ul>
				<li>status: {order.status}</li>
				<li>ordered by:  {order.userId }</li>
				<li>date placed: ${order.datePlaced}</li>
			</ul>
		</>
	}else{


	return <div key={id}>
			<h3 className='orders-list-name'>{singleOrder.id}</h3>
             <ul>
				<li>status: {order.status}</li>
				<li>ordered by:  {order.userId }</li>
				<li>date placed: ${order.datePlaced}</li>
			</ul>
			</div>
	}
};

export default Order;