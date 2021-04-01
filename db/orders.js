const {client} = require('./index');
const { getUserById } = require('./users');


const getAllOrders = async() => {
    try {
        const {rows: orders } = await client.query(`
            SELECT orders.*, order_products.price, order_products.quantity, order_products."productId", order_products."orderId"
            FROM orders
            JOIN order_products ON order_products."orderId" = orders.id;
        `);
        return orders;
    }catch(error) {
        throw error;
    }
}


const getOrderById = async ({id}) => {
    try{
        const {rows: [order]} = await client.query(`
        SELECT orders.*, order_products.price, order_products.quantity, order_products."productId", order_products."orderId"
        FROM orders
        JOIN order_products ON order_products."orderId" = orders.id;
        WHERE id=${id}
        `,[id]);
        return order;
    }catch(error){
        throw error;
    }
};

const getOrdersByUser = async({id}) => {
try {
    const { rows: orders } = await client.query(`
    SELECT orders.*, order_products.price, order_products.quantity, order_products."productId", order_products."orderId"
        FROM orders
        JOIN order_products ON order_products."orderId" = orders.id;
        WHERE users.id=${id};
    `, [id]);

    await getUserById(id)
    return orders;
} catch (error) {
    throw error
}
};


const getOrdersByProduct = async({ id }) => {
    try {
        const { rows: orders } = await client.query(`
        SELECT orders.*, order_products.price, order_products.quantity, order_products."productId", order_products."orderId"
            FROM orders
            JOIN order_products ON order_products."productId" = product.id;
            WHERE "productId"=${id};
            `, [id]);
        return orders;
    } catch (error) {
        throw error;
    }
};



// getCartByUser({ id }) or getCartByUser(user)
//  select one user's order (look up by orders."userId")
//  ...an order that that has status = created
//  return the order, include the order's products

const getCartByUser = async({id}) => {
    try {
        const {rows: orders } = await client.query(`
        SELECT *
        FROM orders
        JOIN users ON users.id = users.id
        WHERE status = 'created';
        `, [id])
        return orders
    }catch(error) {
        throw error;
    }
};



module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct,
    getCartByUser,
    getCartByUser
}