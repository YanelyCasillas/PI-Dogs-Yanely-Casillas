const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;
const {Temperament} = require('../db');

const getTemperaments = async() => {
    const {data} = await axios.get(`${URL}/?api_key=${API_KEY}`);
    for (const {temperament} of data) {
        if (temperament) {
            const arrayTemperaments = temperament.split(', ');
            
            for (const name of arrayTemperaments) {
                await Temperament.findOrCreate({ where: { name } });
            }
        }
    }

    const getAllTemperaments = await Temperament.findAll({
        attributes: ['name'], 
    })
    
    const namesArray = getAllTemperaments.map((temperament) => temperament.name);

    return namesArray;
} 

module.exports = getTemperaments;