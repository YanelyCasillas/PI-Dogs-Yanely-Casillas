import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {getTemperaments, postDog} from '../../Redux/action';
import handlerChange from '../getTemperamentButton';


const Form = () => {

    const [newDog, setInputValue] = useState({
        imageUrl: '',
        name: '',
        measuringSystem: '',
        weightMin: '',
        weightMax: '',
        heightMin: '',
        heightMax: '',
        life_spanMin: '',
        life_spanMax: '',
        temperamentButton: '',
        temperamentInput: '',
        temperamentsTexArea: ''
    })

    const temperaments = useSelector((state)=> state.temperaments);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTemperaments());
    },[])

    const optionsLife = [];
    for (let i = 1; i <= 25; i++) {
        optionsLife.push(<option key={i} value={i}>{i}</option>);
    }

    const [errors, setErrors] = useState({});

    const systemNewDog = () => {
        if (newDog.measuringSystem === 'metric') {
            let conversionWeightMin = Math.ceil(newDog.weightMin / 0.45359237);
            let conversionWeightMax = Math.ceil(newDog.weightMax / 0.45359237);
            let conversionheightMin = Math.floor(newDog.heightMin / 2.54);
            let conversionheightMax = Math.floor(newDog.heightMax / 2.54);
            return{
                weight: {
                    imperial: `${conversionWeightMin} - ${conversionWeightMax}`,
                    metric: `${newDog.weightMin} - ${newDog.weightMax}`
                },
                height: {
                    imperial: `${conversionheightMin} - ${conversionheightMax}`,
                    metric: `${newDog.heightMin} - ${newDog.heightMax}`
                },
            }
        }else{
            let conversionWeightMin = Math.ceil(newDog.weightMin / 2.20462);
            let conversionWeightMax = Math.ceil(newDog.weightMax / 2.20462);
            let conversionheightMin = Math.ceil(newDog.heightMin * 2.54);
            let conversionheightMax = Math.ceil(newDog.heightMax * 2.54);
            return{
                weight: {
                    imperial: `${newDog.weightMin} - ${newDog.weightMax}`,
                    metric: `${conversionWeightMin} - ${conversionWeightMax}`
                },
                height: {
                    imperial: `${newDog.heightMin} - ${newDog.heightMax}`,
                    metric: `${conversionheightMin} - ${conversionheightMax}`
                },
            }
        }
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
        const life_span = `${newDog.life_spanMin} - ${newDog.life_spanMax} years`;
        const createNewDog = {
            imageUrl: newDog.imageUrl,
            name: newDog.name,
            life_span: life_span,
            temperament: newDog.temperamentsTexArea
        }

        const postNewDog = {...createNewDog, ...systemNewDog()}
        dispatch(postDog(postNewDog));
    };

    const handlerChangeForm = (event) => {
        setInputValue({...newDog, [event.target.name]: event.target.value})
        //setErrors(validation({...userData, [event.target.name]: event.target.value})) 
    }
    
    const agreeTemperament = (event) => {
        event.preventDefault();
        let updatedTemperamentsTexArea = newDog.temperamentsTexArea; 

        if (newDog.temperamentButton) {
            if (!updatedTemperamentsTexArea) {
                updatedTemperamentsTexArea += newDog.temperamentButton
            }else{
                if (!updatedTemperamentsTexArea.includes(newDog.temperamentButton)) {
                    updatedTemperamentsTexArea += ', ' + newDog.temperamentButton;
                }
            }
        }

        if (newDog.temperamentInput) {
            const inputTemperament = newDog.temperamentInput.trim();
            const formattedInput = inputTemperament.charAt(0).toUpperCase() + inputTemperament.slice(1);
            if (!updatedTemperamentsTexArea) {
                updatedTemperamentsTexArea += formattedInput; 
            }else{
                if (!updatedTemperamentsTexArea.includes(formattedInput)) {
                    updatedTemperamentsTexArea += ', ' + formattedInput;
                }
            }
        }

        setInputValue({...newDog, temperamentsTexArea: updatedTemperamentsTexArea});
    }


    return(
        <div class='main-container-form'>
            <div>
                <form  onSubmit={handlerSubmit} method="post" autocomplete="off" class="register-form">
                    <h2 class="register-title">Agregar Perro</h2>

                    <div class="first-sector">
                        <input onChange={handlerChangeForm} value={newDog.name} required class="name" type="text" name="name" placeholder="Raza"/>
                    </div>

                    <div class="second-sector">
                        <p>Sistema de medición:</p>
                        <label>
                            <input onChange={handlerChangeForm} type="radio" name='measuringSystem' value='imperial' /> Imperial </label>
                        <label>
                            <input onChange={handlerChangeForm} type="radio" name='measuringSystem' value='metric' /> Metric </label>
                    </div>

                    <div class="three-sector">
                        <label class=''>Peso: </label>
                        <input onChange={handlerChangeForm} name='weightMin' value={newDog.weightMin} type="number" />
                        <label> - </label>
                        <input onChange={handlerChangeForm} name='weightMax' value={newDog.weightMax} type="number" />
                    </div>

                    <div class="three-sector">
                        <label>Altura: </label>
                        <input onChange={handlerChangeForm} name='heightMin' value={newDog.heightMin} type="number" />
                        <label> - </label>
                        <input onChange={handlerChangeForm} name='heightMax' value={newDog.heightMax} type="number" />
                    </div>

                    <div class="four-sector">
                        <label>Tiempo de vida: </label>
                        <select name="life_spanMin" id="life_spanMin" onChange={handlerChangeForm}>
                            <option value=" " disabled selected hidden></option>
                            {optionsLife}
                        </select>
                        <label> - </label>
                        <select name="life_spanMax" id="life_spanMax" onChange={handlerChangeForm}>
                            <option value=" " disabled selected hidden></option>
                            {optionsLife}
                        </select>
                        <label>years</label>
                    </div>

                    <div class="five-sector">
                        <label>Temperamentos: </label>
                        <div id='autocomplete-wrapper' class='autocomplete-wrapper'>
                            <input id='autocomplete-input' name='temperamentButton' onChange={(event)=>handlerChange(event, temperaments, setInputValue, newDog)} type="text" placeholder='Temperamentos'/>
                        </div>
                        
                        <input onChange={handlerChangeForm} name='temperamentInput' type="text" placeholder='Otros Temperamentos'/>
                        <button onClick={agreeTemperament}>Agregar</button>
                    </div>

                    <div class="six-sector">
                        <label>Temperamentos escogidos:</label>
                        <textarea name="temperamentsTexArea" value={newDog.temperamentsTexArea} id="" cols="50" rows="1" readOnly></textarea>
                    </div>

                    <div>
                    <label for="imagen">Selecciona una imagen:</label>
                    <input onChange={handlerChangeForm} type="file" id="imageUrl" name="imageUrl" accept="image/*"/>
                    </div>

                    <button type="submit" class="register-form-submit">Crear nuevo perro</button>
                </form>
            </div>
        </div>
    )

}

export default Form;
