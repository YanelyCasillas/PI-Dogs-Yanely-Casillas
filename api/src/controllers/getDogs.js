const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getDogs = async() => {
    const {data} = await axios.get(`${URL}/?api_key=${API_KEY}`);
    const dogsApi = data.map(({id, reference_image_id, name, weight, height, life_span, temperament}) =>
    ({id, reference_image_id, name, weight, height, life_span, temperament}));
    const allDog = await Dog.findAll({include: [
        {
            model: Temperament,
            through: {
                attributes: [],
            }
        }
    ]});
    return [...dogsApi, ...allDog];
};
module.exports = getDogs;