import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
	try{
		const { data: products } = await axios.get('/api/products');
		return products;
	}
	catch(error) {
		throw error;
	}
}

export async function getProductById(id) {
	try{
		const {data} = await axios.get(`/api/products/${id}`)
		return data;
	}catch(error) {
		throw error;
	}
}

export async function login({username, password}) {

	try{
		const {data} = await axios.post(`/api/users/login`, {username, password});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function register({
	firstName,
  lastName,
  email,
  username,
  password,
  imageURL
}) {
	try{
		const {data} = await axios.post('/api/users/register', {
			firstName,
			lastName,
			email,
			username,
			password,
			imageURL
		});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function getMe(token) {
	try{
		const {data} = await axios.get('/api/users/me', {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data;
	}
	catch(error){
		throw error;
	}
};

export async function getOrdersByUser(user, token) {
	try{
		const {data} = await axios.get(`/api/users/${user.id}/orders`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data
	}
	catch(error){
		throw error;
	}
}

export async function cancelOrder(order, token) {
	try{
		const {data} = await axios.delete(`/api/orders/${order.id}`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		console.log(data, 'I am going to delete the data, and hopefully just the data')
		// data = null;
		
	}catch(error) {
		throw error;
	}
}

export async function completeOrder(order, token) {
	try{
		const {data} = await axios.patch(`api/orders/${order.id}`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		console.log(data, "I am going to update the data and only the one piece of data")
		data.status = "completed"
		return data
	}catch(error) {
		throw error;
	}
}
