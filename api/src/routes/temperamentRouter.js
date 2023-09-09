const { Router } = require('express');
const {getTemperamentsHandler} = require('../handlers/getHandler');

const temperamentRouter = Router();

temperamentRouter.get('/', getTemperamentsHandler );

module.exports = temperamentRouter;