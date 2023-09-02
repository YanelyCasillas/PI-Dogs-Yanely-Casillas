const { Router } = require('express');
const router = Router();
const {getDogsHandler, getDogsByIdHandler, getDogsNameHandler, getTemperamentsHandler} = require('../handlers/getHandler');
const {postDogsHandler} = require('../handlers/postHandler');
const {putDogdByIdHandler} = require('../handlers/putHandler');
const {deleteDogHandler} = require('../handlers/deleteHandler');

router.get('/', getDogsHandler );

router.get('/name', getDogsNameHandler );

router.get('/temperaments', getTemperamentsHandler );

router.get('/:id', getDogsByIdHandler );

router.post('/', postDogsHandler );

router.put('/', putDogdByIdHandler );

router.delete('/:id', deleteDogHandler );

module.exports = router;
