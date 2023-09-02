const putDogdById = require('../controllers/putDogsById');

const putDogdByIdHandler = async(req, res) => {
    try {
        const {id, reference_image_id, name, weight, height, life_span, temperament} = req.body;
        const dogChange = await putDogdById(id, reference_image_id, name, weight, height, life_span, temperament);
        res.status(200).json(dogChange)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    putDogdByIdHandler
}