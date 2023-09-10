const putDogdById = require('../controllers/putDogsById');

const putDogdByIdHandler = async(req, res) => {
    try {
        const {id, imageUrl, name, weight, height, life_span, temperament} = req.body;
        await putDogdById(id, imageUrl, name, weight, height, life_span, temperament);
        res.status(200).send('Los cambios se han guardado correctamente')
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    putDogdByIdHandler
}