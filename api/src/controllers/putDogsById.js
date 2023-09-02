const { Dog, Temperament } = require('../db');

const putDogdById = async(id, reference_image_id, name, weight, height, life_span, temperament) => {
    const changeDog = await Dog.update({reference_image_id, name, weight, height, life_span}, {where: {id}});
    console.log(changeDog);
    if (changeDog === 0) throw Error('El perro no existe');
        const updatedDog = await Dog.findByPk(id);
        await updatedDog.setTemperaments([]);
        for (const temName of temperament) {
            const [temperamentInstance, created] = await Temperament.findOrCreate({ where: { name: temName }});

            await updatedDog.addTemperaments([temperamentInstance]);
        }
        
        const showDog = await Dog.findByPk(id, {
            include: [
                {
                    model: Temperament,
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        return showDog
    
}

module.exports = putDogdById;