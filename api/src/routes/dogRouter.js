const { Router } = require('express');
const {getDogsHandler, getDogsByIdHandler, getDogsNameHandler} = require('../handlers/getHandler');
const {postDogsHandler} = require('../handlers/postHandler');
const {putDogdByIdHandler} = require('../handlers/putHandler');
const {deleteDogHandler} = require('../handlers/deleteHandler');

const dogRouter = Router();

dogRouter.get('/', getDogsHandler );

dogRouter.get('/name', getDogsNameHandler );

dogRouter.get('/:id', getDogsByIdHandler );

dogRouter.post('/', postDogsHandler );

dogRouter.put('/', putDogdByIdHandler );

dogRouter.delete('/:id', deleteDogHandler );

module.exports = dogRouter;