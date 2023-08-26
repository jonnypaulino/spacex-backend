const RocketsController = require('./controller/controller');

const routes = require('express').Router();

routes.route('/rockets').get(
   RocketsController().getRocket
);



module.exports = routes;