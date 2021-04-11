import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';


const Orders = ({ orders }) => {
	return <>
		<h1>ORDERS!</h1>
		<div className='orders-list'>
		{orders.map(order => {
			return <div key={order.id}>
				<Order order={order} orders={orders} />
			</div>
		})}
		</div>
	</>
};



export default Orders;