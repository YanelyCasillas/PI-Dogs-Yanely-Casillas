const { Op } = require("sequelize");
const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

/*Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarlo independientemente de mayúsculas o minúsculas.
Si no existe la raza, debe mostrar un mensaje adecuado.
Debe buscar tanto los de la API como los de la base de datos. */

const getDogsByName = async(name) => {
    const dogsFind = await Dog.findAll({where: {name: {[Op.like]: `%${name.toLowerCase()}%`}}, include: [
        {
            model: Temperament,
            through: {
                attributes: [],
            }
        }
    ]});

    const {data} = await axios.get(`${URL}/search?q=${name}&api_key=${API_KEY}`);
    const dogsApi = data.map(({id, reference_image_id, name, weight, height, life_span, temperament}) => 
    ({id, reference_image_id, name, weight, height, life_span, temperament}));

    return [...dogsApi, ...dogsFind];
}

module.exports = getDogsByName;