const { Dog, Temperament } = require('../db');

const postDogs = async (imageUrl, name, weight, height, life_span, temperament) => {

    if (!imageUrl || !name || !weight || !height || !life_span || !temperament) throw Error('Me falta info');
    
    const [newDog, created] = await Dog.findOrCreate({ where: { imageUrl, name, weight, height, life_span }});

    if (!created) throw Error('El perro ya existe');

    const arrayTemperament = temperament.split(', ');

    for (const temName of arrayTemperament) {

        const [temperamentInstance, created] = await Temperament.findOrCreate({ where: { name: temName }});

        await newDog.addTemperaments([temperamentInstance]);
    }
    
    const showDog = await Dog.findOne({where: {id: newDog.id}, include: [
        {
            model: Temperament,
            through: {
                attributes: [],
            }
        }
    ]})

    return showDog;
}

module.exports = postDogs;
