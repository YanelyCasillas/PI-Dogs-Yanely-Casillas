const postDogs = require('../controllers/postDogs');

const postDogsHandler = async( req, res ) => {
    try {
        const {imageUrl, name, weight, height, life_span, temperament} = req.body;
        const newDog = await postDogs(imageUrl, name, weight, height, life_span, temperament);
        res.status(201).send(newDog)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postDogsHandler
}