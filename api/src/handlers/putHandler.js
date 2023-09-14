const putDogdById = require('../controllers/putDogsById');

const putDogdByIdHandler = async(req, res) => {
    try {
        const {id, imageUrl, name, weight, height, life_span, temperament} = req.body;
        const update = await putDogdById(id, imageUrl, name, weight, height, life_span, temperament);
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    putDogdByIdHandler
}