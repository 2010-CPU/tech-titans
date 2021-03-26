const express = require('express');
const {createUser,
    getUserByUsername,
    getUserById,
    getUser,
    getAllUsers } = require('../db/products');

const usersRouter = express.Router();