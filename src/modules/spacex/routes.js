const { celebrate, Segments, Joi } = require('celebrate');
const SpacexController = require('./controller/controller');

const routes = require('express').Router();

routes.route('/launches').get(
   celebrate({
      [Segments.QUERY]: {
         page: Joi.number().integer().min(1).optional(),
         search: Joi.string().optional(),
         limit: Joi.number().integer().min(1).optional()
      },
   }),
   SpacexController().getLaunches
);

module.exports = routes;