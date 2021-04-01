const express = require('express');
const cartRouter = express.Router();
const {requireUser} = require('./utils')

cartRouter.get('/', requierUser, async(req, res, next) => {
    
})



module.exports = cartRouter;