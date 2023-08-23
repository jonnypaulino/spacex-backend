const  SpacexController  = require('./controller/controller');

const routes = require('express').Router();

routes.route('/launches').get(
   SpacexController().getLaunches
  );
  
  module.exports = routes;