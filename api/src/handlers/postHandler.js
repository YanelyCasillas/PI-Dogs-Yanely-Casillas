const postDogs = require('../controllers/postDogs');

const postDogsHandler = async( req, res ) => {
    try {
        const {reference_image_id, name, weight, height, life_span, temperament} = req.body;
        const newDog = await postDogs(reference_image_id, name, weight, height, life_span, temperament);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postDogsHandler
}