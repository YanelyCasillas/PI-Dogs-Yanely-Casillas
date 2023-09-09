const postDogs = require('../controllers/postDogs');

const postDogsHandler = async( req, res ) => {
    try {
        const {imageUrl, name, weight, height, life_span, temperament} = req.body;
        console.log(imageUrl, name, weight, height, life_span, temperament);
        const newDog = await postDogs(imageUrl, name, weight, height, life_span, temperament);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postDogsHandler
}