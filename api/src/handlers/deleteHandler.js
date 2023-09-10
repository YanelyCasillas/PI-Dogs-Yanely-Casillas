const deleteDogById = require('../controllers/deteleDogsById');

const deleteDogHandler = async(req, res) => {
    try {
        const {id} = req.params;
        await deleteDogById(id);
        res.status(200).send('Perro eliminado');
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
module.exports = {
    deleteDogHandler
}