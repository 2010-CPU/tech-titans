require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_SECRET = "neverTell"} = process.env
const usersRouter = express.Router();
const express = require('express');
const { requireUser } = require('./utils');

const {createUser,
    getUserByUsername,
    getUser,
    } 
    = require('../db/users');



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

usersRouter.get('/me', requireUser , (req, res, next) => {
    console.log(user, 'ME USER')
    res.send(req.user)  
});

module.exports = usersRouter;