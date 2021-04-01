const { createOrder } = require('./orders.js')

const createInitialOrders = async () => {
	try{
		console.log('Starting to create initial orders');
		const ordersToCreate = [
		
      {
      	id: 8, 
        status: 'created', 
      	userId: 1, 
      	datePlaced: 01/01/2020, 
      },
      {
        id: 42, 
        status: 'created', 
        userId: 2, 
        datePlaced: 01/02/2020, 
    },
    ];
  	
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('ORDERS CREATED:', orders);
    console.log('FINISHED CREATING ORDERS');
	}
	catch(error){
		throw error;
	}
}

module.exports = {
    createInitialOrders
}