const deleteDogById = require('../controllers/deteleDogsById');

const deleteDogHandler = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteDog = await deleteDogById(id);
        res.status(200).json();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
module.exports = {
    deleteDogHandler
}