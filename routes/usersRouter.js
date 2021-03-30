require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_SECRET = "don't tell a soul"} = process.env
const express = require('express');
const usersRouter = express.Router();
const { requireUser } = require('./utils');

const {
  getUserByUsername,
  getUser,
  getAllUsers,
  getUserById,
} = require('../db/users');

const {
	createUser,
} = require('../db/index');

usersRouter.get('/', async(req, res, next) => {
    try {
        const allUsers = await getAllUsers()
        res.send(allUsers)
    } catch (error) {
        next(error)
    }
});

usersRouter.get('/me', async (req, res, next) => {
	console.log('STARTING TO GET ME');
	const prefix = 'Bearer '
	const auth = req.headers.authorization;
	if (!auth) {
		next({
			name: 'noAuthorizationError',
			message: 'i need a token. there is a token machine in the lobby.'
		});
	}
	else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);
		
		try{
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				const user = await getUserById(id);
				res.send(user);
			}
		}
		catch(error){
			console.log('THE ERROR FROM /ME', error);
			next(error);
		}
	}
	else {
		next({
			name: 'AuthorizationHeaderError',
			message: `Authorization token must start with ${ prefix }`
		});
	}
	
	
});

usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body;
    try {
      const checkUser = await getUserByUsername(username);
      if (checkUser) {
          throw new Error ('A user by that username already exists.')
      }
      if (password.length < 8) {
          throw new Error ('Passwords must be at least 8 characters long')
      }

      const user = await createUser(req.body)

      const token = jwt.sign({
		    id: user.id,
		    username : user.username
      }, JWT_SECRET, {
        expiresIn: '1w'
      });
      res.send({
        user,
        token,
        message: 'Registered successfully'
      });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async(req, res, next) => {
    const { username, password } = req.body
    if (!username || ! password){
        throw new Error ('Both username and password are required')
    }
    try {
        const user = await getUser({username, password});
        if (user) {
          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, JWT_SECRET,)
          res.send({ 
            message: "you're logged in!", 
            user,
            token: token
          });
        } else {
            throw new Error ('Username or password is incorrect')
        }
    } catch (error) {
        next(error)
    }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, JWT_SECRET);
            res.send({...user});
        } else {
            return next({message: 'You must be logged in to perform this action'});
        }
    } catch (error) {
        next(error);
    }
});




module.exports = usersRouter;
