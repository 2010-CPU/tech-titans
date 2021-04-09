const apiRouter = require('express').Router();

const productsRouter = require('./productsRouter.js');
apiRouter.use('/productsRouter.js', productsRouter);

const usersRouter = require('./usersRouter.js');
apiRouter.use('/usersRouter.js', usersRouter);

const ordersRouter = require('./ordersRouter.js');
apiRouter.use('/ordersRouter.js', ordersRouter);


apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get((req, res, next) => {
  res.status(404).send(error)
});

apiRouter.use((error, req, res, next) => {
  console.error(error)
  res.status(500).send(error)
});



module.exports = apiRouter;
