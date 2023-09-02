const { Dog} = require('../db');

const deleteDogById = async(id) => {
    const findDog = await Dog.findByPk(id);
    if (!findDog) throw Error('El perro no existe');
    await findDog.setTemperaments([]);
    await Dog.destroy({where: {id}});
}

module.exports = deleteDogById;