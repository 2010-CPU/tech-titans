const {client, dropTables} = require('./index');
const bcrypt = require('bcrypt');





// createUser has an "imageURL" created in the table but I left that out because it doesn't feel like it belongs here to me. 
// const createUser = async ({		
//     firstName,
//     lastName,
//     email,
//     username,
//     password,
//     }) => {
//     try {
//         const SALT_COUNT = 10;
//         const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
//         const { rows: [user] } = await client.query(`
//         INSERT INTO users("firstName", "lastName", email, username, password, "isAdmin")
//         VALUES($1, $2, $3, $4, $5, $6)
//         ON CONFLICT (username) DO NOTHING 
//         RETURNING *;
//         `, [firstName, lastName, email, username, hashedPassword, isAdmin]);
//         delete user.password
//         return user
//     } catch (error) {
//         throw error;
//     }
// }

// const createInitialUsers = async () => {
// 	try{
// 		console.log('starting to create initial users');
		
// 		const usersToCreate = [
// 			{ FirstName: 'Henry', lastName: "Hugglefish", email: 'henryhugglefish@huggamugga.com', userName: 'Henry', password: 'password', isAdmin: false},
//             { FirstName: 'Boaty', lastName: 'McBoatface', email: 'boatyboat@boat.com', userName: 'Skipper', password: 'dipper', isAdmin: false},
//             { FirstName: 'Anita', lastName: 'Bath', email: 'Anita@bath.com', userName: 'calgon', password: '12345678', isAdmin: true},
//             { FirstName: 'Ollie', lastName: 'Tabogger', email: 'yummy@delish.com', userName: 'imonlyseven', password: 'sevenisbest', isAdmin: true},
// 		];
		
// 		const users = await Promise.all(usersToCreate.map(user => createUser(user)));
// 		console.log('USERS CREATED:', users);
// 		console.log('FINISHED CREATING USERS');
// 	}
// 	catch(error){
// 		throw error;
// 	}
// };

const getUserByUsername = async (username) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$4;
        `, [username]);
      
        return user
    } catch (error) {
        throw error
    }
}

const getUser = async ({username, password}) => {
    try {
        const user = await getUserByUsername(username);
    
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordsMatch){
            delete user.password
            return user
        } 
    } catch (error) {
        throw error
    }  
}

const getUserById = async (id) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username, password
        FROM users
        WHERE id=${ id }
        `);
        delete user.password
        return user
    } catch (error) {
        throw error
    }
};

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(`
        SELECT *
        FROM users
        `)
        return users
    } catch (error) {
        throw error
    }
};


module.exports = {
    createUser,
    createInitialUsers,
    getUserByUsername,
    getUserById,
    getUser,
    getAllUsers
}