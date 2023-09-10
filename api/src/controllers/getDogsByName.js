const { Op } = require("sequelize");
const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getDogsByName = async(name) => {

    const capitalizeWords = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const formattedName = capitalizeWords(name);

    const dogsFind = await Dog.findAll({where: {name: {[Op.like]: `%${formattedName}%`}}, include: [
        {
            model: Temperament,
            through: {
                attributes: [],
            }
        }
    ]});

    const dogsBD = dogsFind.map(({id, imageUrl, name, height, weight, life_span, temperaments})=>{
        const temperament = temperaments.map((t)=>t.name).join(', ');
        return {id, imageUrl, name, height, weight, life_span, temperament}
    })

    const {data} = await axios.get(`${URL}/search?q=${name}&api_key=${API_KEY}`);
    const dogsApi = data.map(({id, image: {url}, name, weight, height, life_span, temperament}) => 
    ({id, imageUrl: url, name, weight, height, life_span, temperament}));

    return [...dogsApi, ...dogsBD];
}

module.exports = getDogsByName;