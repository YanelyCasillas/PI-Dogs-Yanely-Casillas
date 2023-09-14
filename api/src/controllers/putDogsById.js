const { Dog, Temperament } = require('../db');

const putDogdById = async(id, imageUrl, name, weight, height, life_span, temperament) => {
    await Dog.update({imageUrl, name, weight, height, life_span}, {where: {id}});

    const updatedDog = await Dog.findByPk(id);

    await updatedDog.setTemperaments([]);

    const arrayTemperament = temperament.split(', ');

    for (const temName of arrayTemperament) {
        const [temperamentInstance, created] = await Temperament.findOrCreate({ where: { name: temName }});
        await updatedDog.addTemperaments([temperamentInstance]);
    }
    
    return 'Los cambios se han guardado correctamente'
}

module.exports = putDogdById;