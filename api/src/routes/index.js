const { Router } = require('express');
const dogRouter = require('./dogRouter');
const temperamentRouter = require('./temperamentRouter');

const router = Router();
router.use('/dogs', dogRouter);
router.use('/temperaments', temperamentRouter);

module.exports = router;
