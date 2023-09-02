const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;
/*Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
La raza es recibida por parámetro (ID).
Tiene que incluir los datos de los temperamentos asociadas a esta raza.
Debe funcionar tanto para los perros de la API como para los de la base de datos. */

const getDogsById = async(id) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (uuidPattern.test(id)) {
        const dogFind = await Dog.findOne({where: {id}, include: [
            {
                model: Temperament,
                through: {
                    attributes: [],
                }
            }
        ]});
        if (dogFind) return dogFind
        return[]
    }else{
        const {data} = await axios.get(`${URL}/${id}?api_key=${API_KEY}`);
        const {reference_image_id, name, height, weight, life_span, temperament} = data
        let dogApi = {
            id: id,
            reference_image_id,
            name,
            height,
            weight,
            life_span,
            temperament
        }
        return dogApi;
    }    
}

module.exports = getDogsById;

