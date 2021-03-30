const {client} = require('./index');
const { getUserById } = require('./users');


const getAllOrders = async () => {
    try {
        const {rows: orders } = await client.query(`
            SELECT * 
            FROM orders
            JOIN products ON "productId" = product.id;
        `);
        return orders;
    }catch(error) {
        throw error;
    }
}


const getOrderById = async ({id}) => {
    try{
        const {rows: [order]} = await client.query(`
        SELECT *
        FROM orders
        WHERE id=${id}
        JOIN products ON "productId" = product.id;
        `,[id]);
        return order;
    }catch(error){
        throw error;
    }
};

const getOrdersByUser = async({id}) => {
try {
    const { rows: orders } = await client.query(`
    SELECT *
        FROM orders
        JOIN products on "productId" = product.id
        WHERE users.id=${id};
    `, [id]);
    
    await getUserById(id)
    return orders;
} catch (error) {
    throw error
}
};


function getOrdersByProduct({ id }) {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
            JOIN order_products ON "productId"
            WHERE "productId"=${id};
            `, [id]);
        return orders;
    } catch (error) {
        throw error;
    }
};

const getCartByUser = async({id}) => {
    try {
        const {rows: orders } = await client.query(`
        SELECT *
        FROM orders
        JOIN users ON "userId" = users.id
        WHERE status = 'created;
        `, [id])
        return order
    }catch(error) {
        throw error;
    }
};

const createOrder = async ({status, userId}) => {
    try{
        const { rows: order } = await client.query(`
            INSERT INTO orders ( status, "userId)
            VALUES ($1, $2)
            RETURNING *;
        `, [status, userId])
        return order;
    }catch(error) {
        throw error;
    }
}
  
module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser
}