const getDogs = require('../controllers/getDogs');
const getDogsById = require('../controllers/getDogsById');
const getDogsByName = require('../controllers/getDogsByName');
const getTemperaments = require('../controllers/getTemperaments');


const getDogsHandler =  async( req, res ) => {
    try {
        const response = await getDogs();
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDogsByIdHandler = async( req, res ) => {
    try {
        const {id} = req.params;
        const response = await getDogsById(id);

        response.name 
        ? res.status(200).json(response)
        : res.status(404).send("Not found")
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDogsNameHandler = async( req, res ) => {
    try {
        const {name} = req.query;
        const nameFind = await getDogsByName(name)
        nameFind.length > 0 
        ? res.status(200).json(nameFind)
        : res.status(404).send("Not exist")
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}

const getTemperamentsHandler = async( req, res ) => {
    try {
        const temperamentsFind = await getTemperaments();
        res.status(200).json(temperamentsFind)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    getDogsNameHandler,
    getTemperamentsHandler
}