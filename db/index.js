// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt');

// database methods
async function dropTables() {
  console.log('dropping all tables');
  try{
  await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
  `);
  }
  catch(err){
  	throw err
  }
};

async function buildTables() {
  console.log('building all tables');
  try{
		await client.query(`
		  CREATE TABLE products(
		    id SERIAL PRIMARY KEY,
		    name VARCHAR(255) NOT NULL,
		    description VARCHAR(255) NOT NULL,
		    price INTEGER NOT NULL,
		    "imageURL" VARCHAR(255),
		    "inStock" BOOLEAN DEFAULT false,
		    category VARCHAR(255) NOT NULL
		  );
		`);

		// added quotes to firstName, lastName because they were causing case-folding errors
		// took out imageURL because I don't think it goes here, and it was violating non-null constraint
		await client.query(`
		    CREATE TABLE users(
		      id SERIAL PRIMARY KEY,
		      "firstName" VARCHAR(255) NOT NULL,
		      "lastName" VARCHAR(255) NOT NULL,
		      email VARCHAR(255) UNIQUE NOT NULL,
		
		      username VARCHAR(255) NOT NULL,
		      password VARCHAR(255) UNIQUE NOT NULL,
		      "isAdmin" BOOLEAN DEFAULT false
		    )
		`);
	await client.query(`
			CREATE TABLE orders(
				id SERIAL PRIMARY KEY,
				status VARCHAR(255) DEFAULT 'created',
				"userId" INTEGER REFERENCES users(id),
				"datePlaced" DATE NOT NULL
			)
	`);
	await client.query(`
			CREATE TABLE order_products(
				id SERIAL PRIMARY KEY,
				"productId" INTEGER REFERENCES products(id),
				"orderId" INTEGER REFERENCES orders(id),
				price INTEGER NOT NULL,
				quantity INTEGER NOT NULL DEFAULT 0
			)
	`);
	}
	catch(err){
		throw err;
	}
};


// I feel like this should be on the products page, but it's working, so I don't want to go moving stuff around right now. 
const createProduct = async ({name, description, price, imageUrl, inStock, category}) => {

	try{
		const {rows: [product]} = await client.query(`
			INSERT INTO products (name, description, price, "imageURL", "inStock", category)
			VALUES($1, $2, $3, $4, $5, $6)
			RETURNING *;
		`, [name, description, price, imageUrl, inStock, category]);

		return product;
	}
	catch(err){

		throw err;
	}
};


// I feel like this should be on the products page, but it's working, so I don't want to go moving stuff around right now. 
const createInitialProducts = async () => {
	try{
		console.log('starting to create initial products');
		
		const productsToCreate = [
			{ name: 'very good product', description: "IT'S GREAT!", price: 2000, imageUrl: 'placeholder', inStock: false, category:  'good stuff'},
			{ name: 'fancy product', description: "IT'S FANCY!", price: 200000, imageUrl: 'placeholder', inStock: true, category:  'fancy stuff' },
			{ name: 'an everyday product', description: "IT'S STANDARD!", price: 200, imageUrl: 'placeholder', inStock: true, category:  'standard stuff' },
			{ name: 'rare product', description: "IT'S RARE!", price: 20000000, imageUrl: 'placeholder', inStock: true, category:  'rare stuff' }
		];
		
		const products = await Promise.all(productsToCreate.map(createProduct));
		console.log('PRODUCTS CREATED:', products);
		console.log('FINISHED CREATING PRODUCTS');
	}
	catch(err){
		throw err;
	}
};

// createUser has an "imageURL" created in the table but I left that out because it doesn't feel like it belongs here to me. 
// took out    ON CONFLICT (username) DO NOTHING because it was throwing errors
// I feel like this should be in the users file, but it's working (I think) and I don't want to move things around right now. 
const createUser = async ({		
    firstName,
    lastName,
    email,
    username,
    password,
    }) => {

    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
		// client.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
		// 	console.log(result);
		//   });
        const { rows: [user] } = await client.query(`
        INSERT INTO users("firstName", "lastName", email, username, password)
        VALUES($1, $2, $3, $4, $5)

        RETURNING *;
        `, [firstName, lastName, email, username, hashedPassword]);
        delete user.password

        return user
    } catch (error) {
        throw error;
    }
};


// I feel like this should be in the users file, but it's working (I think) and I don't want to move things around right now. 
const createInitialUsers = async () => {
	try{
		console.log('starting to create initial users');
		
		const usersToCreate = [
			{ firstName: 'Henry', lastName: "Hugglefish", email: 'henryhugglefish@huggamugga.com', username: 'Henry', password: 'password', isAdmin: false},
            { firstName: 'Boaty', lastName: 'McBoatface', email: 'boatyboat@boat.com', username: 'Skipper', password: 'dipper', isAdmin: false},
            { firstName: 'Anita', lastName: 'Bath', email: 'Anita@bath.com', username: 'calgon', password: '12345678', isAdmin: true},
            { firstName: 'Ollie', lastName: 'Tabogger', email: 'yummy@delish.com', username: 'imonlyseven', password: 'sevenisbest', isAdmin: true},
		];
		
		const users = await Promise.all(usersToCreate.map(user => createUser(user)));
		console.log('USERS CREATED:', users);
		console.log('FINISHED CREATING USERS');
	}
	catch(error){
		throw error;
	}
};


// export
module.exports = {
  client,
  dropTables,
  buildTables,
  createInitialProducts,
  createUser,
  createInitialUsers

}
