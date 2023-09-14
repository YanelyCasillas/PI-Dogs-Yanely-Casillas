const { Dog} = require('../db');

const deleteDogById = async(id) => {
    const findDog = await Dog.findByPk(id);
    await findDog.setTemperaments([]);
    await Dog.destroy({where: {id}});
}

module.exports = deleteDogById;