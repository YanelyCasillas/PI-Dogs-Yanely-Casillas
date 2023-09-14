const { Dog, Temperament } = require('../db');

const postDogs = async (imageUrl, name, weight, height, life_span, temperament) => {
    const [newDog, created] = await Dog.findOrCreate({ where: { imageUrl, name, weight, height, life_span }});

    if (!created) return'El perro ya existe';
    
    const arrayTemperament = temperament.split(', ');

    for (const temName of arrayTemperament) {
        const [temperamentInstance, created] = await Temperament.findOrCreate({ where: { name: temName }});
        await newDog.addTemperaments([temperamentInstance]);
    }

    return 'El perro ha sido creado';
}

module.exports = postDogs;
