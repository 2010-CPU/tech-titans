const {client} = require('./index');
const { getUserById } = require('./users');


const getAllOrders = async () => {
    try {
        const {rows: orders } = await client.query(`
            SELECT * 
            FROM orders
            JOIN order_products ON "orderId" = order.id;
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
        JOIN order_products ON "orderId" = order.id;
        `,[id]);
        return order;
    }catch(error){
        throw error;
    }
};

const getOrdersByUser = async({id})
try {
    const { rows: routines } = await client.query(`
    SELECT
        routines.id,
        routines.name,
        routines."creatorId",
        users.username AS "creatorName",
        routines.goal,
        routines."isPublic"
        FROM routines
        JOIN users on "creatorId" = users.id
        WHERE users.username=$1;
    `, [username]);
    
    await getActivitiesForRoutines(routines)
    console.log("Routines by user!!!!!!:", routines)
    return routines
} catch (error) {
    throw error
}


function getOrdersByUser({ id }) {
    try {
        const { rows: orders } = await client.query(`
    SELECT *
        FROM orders
        JOIN order_products on "orderId" = order.id
        WHERE users.username=$1;
    `, [id]);

        await getUserById(id);
        return orders;

    } catch (error) {
        throw error;
    }
} 

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
}
  
module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProduct
}