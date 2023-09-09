const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getDogsById = async(id) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (uuidPattern.test(id)) {
        const dogFind = await Dog.findOne({where: {id}, include: [
            {
                model: Temperament,
                attributes:['name'],
                through: {
                    attributes: [],
                }
            }
        ]});

        if (dogFind) {
            const temperamentsArray = dogFind.temperaments.map((temperament) => temperament.name).join(', ');
            const dogData ={
                id: dogFind.id,
                imageUrl: dogFind.imageUrl,
                name: dogFind.name,
                weight: dogFind.weight,
                height: dogFind.height,
                life_span: dogFind.life_span,
                temperament: temperamentsArray
            }
            return dogData;
        }
        return[]
    }else{
        const {data} = await axios.get(`${URL}/${id}?api_key=${API_KEY}`);
        
        const {reference_image_id, name, height, weight, life_span, temperament} = data
        const imageUrl = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`
        let dogApi = {
            id: id,
            imageUrl,
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



/*const { Dog, Temperament } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL, API_KEY } = process.env;

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
        const imageUrl = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`
        let dogApi = {
            id: id,
            imageUrl,
            name,
            height,
            weight,
            life_span,
            temperament
        }
        return dogApi;
    }    
}

module.exports = getDogsById; */