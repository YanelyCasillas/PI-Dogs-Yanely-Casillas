const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getDogs = async() => {
    const {data} = await axios.get(`${URL}/?api_key=${API_KEY}`);
    const dogsApi = data.map(({id, image: {url}, name, weight, height, life_span, temperament}) =>
    ({id, imageUrl: url, name, weight, height, life_span, temperament}));

    const allDog = await Dog.findAll({
        include: [
        {
            model: Temperament,
            through: {
                attributes: [],
            }
        }
    ]});

    const dogBD = allDog.map(({id, imageUrl, name, height, weight, life_span, temperaments})=>{
        const temperament = temperaments.map((t) => t.name).join(', ');
        return {id, imageUrl, name, height, weight, life_span, temperament}
    })
    return [...dogsApi, ...dogBD];
};
module.exports = getDogs;