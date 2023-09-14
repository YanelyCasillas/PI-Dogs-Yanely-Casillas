const validateName = (nameValue) => {
    if (nameValue === '') {
        return "Por favor, ingresa una raza."
    }
    if (nameValue.length > 30) {
        return "El temperamento no puede tener más de 30 caracteres"
    }
    if (/\d/.test(nameValue)) {
        return "La raza no debe incluir números"
    }
    return ""
}

const validateMeasuringSystem = (measuringSystemValue, weightMinValue, weightMaxValue, heightMinValue, heightMaxValue) => {
    if (!weightMinValue && !weightMaxValue && !heightMinValue && !heightMaxValue) {
        return ''
    }
    if (!measuringSystemValue) {
        return "Por favor, selecciona un sistema de medición"
    }
    
    return ""
}

const validateWeight = (weightMinValue, weightMaxValue) => {
    if (weightMinValue === '' && weightMaxValue === '') {
        return ''
    }
    if (weightMinValue === '0' || weightMaxValue === '0') {
        return "El peso no puede ser 0"
    }
    if (weightMaxValue && weightMinValue && (Number(weightMaxValue) <= Number(weightMinValue))) {
        return "El peso máximo no puede ser igual o menor que el peso mínimo"
    }
    return ""
}

const validateHeight = (heightMinValue, heightMaxValue) => {
    if (heightMinValue === '' && heightMaxValue === '') {
        return ''
    }
    if (heightMinValue === '0' || heightMaxValue === '0') {
        return "El peso no puede ser 0"
    }
    if (heightMaxValue && heightMinValue && (Number(heightMaxValue) <= Number(heightMinValue))) {
        return "La altura máxima no puede ser igual o menor que la altura mínima"
    }
    return ""
}

const validateLifeSpan = (life_spanMinValue, life_spanMaxValue) => {
    if (!life_spanMaxValue && !life_spanMinValue) {
        return ""
    }
    if (life_spanMaxValue && life_spanMinValue && (Number(life_spanMaxValue) <= Number(life_spanMinValue))) {
        return "El tiempo de vida máxima no puede ser igual o menor que el tiempo de vida mínima"
    }
    return ""
}

const validateTemperament = (temperamentValue) => {
    if (temperamentValue === '') {
        return ''
    }
    if (temperamentValue.length > 30) {
        return "El temperamento no puede tener más de 30 caracteres"
    }
    if (/\d/.test(temperamentValue)) {
        return "El temperamento no debe incluir números"
    }
    return ""
}
const validateAllTemperament = (temperamentsValue) => {
    if (!temperamentsValue) {
        return "La lista de temperamentos no puede estar vacía"
    }
    return ""
}

const validateImage = (imageValue) => {
    if (imageValue === '') {
        return ''
    }
    if (!/^(http|https):\/\/[^ "]+$/.test(imageValue)) {
        return "Tiene que tener el formato URL"
    }
    return ""
}

const validation = (data) => {
    const errors = {}
    errors.name = validateName(data.name);
    errors.measuringSystem = validateMeasuringSystem(data.measuringSystem, data.weightMin, data.weightMax, data.heightMin, data.heightMax);
    errors.weightMax = validateWeight(data.weightMin, data.weightMax);
    errors.heightMax = validateHeight(data.heightMin, data.heightMax);
    errors.life_spanMax = validateLifeSpan(data.life_spanMin, data.life_spanMax)
    errors.temperamentInput = validateTemperament(data.temperamentInput);
    errors.temperamentsTexArea = validateAllTemperament(data.temperamentsTexArea);
    errors.imageUrl = validateImage(data.imageUrl);
    return errors
}

export default validation