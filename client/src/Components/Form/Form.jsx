import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getTemperaments, postDog, updateDog} from '../../Redux/action';
import handlerChange from '../getTemperamentButton';


const Form = () => {

    const [isEditing, setIsEditing] = useState(false);
    const dogDetail = useSelector((state)=>state.dogDetail);
    const { id } = useParams();
    const navigate = useNavigate();

    const [newDog, setInputValue] = useState({
        id:'',
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

    console.log(newDog.imageUrl);

    const temperaments = useSelector((state)=> state.temperaments);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTemperaments());
        if (id) {
            const weight = dogDetail.weight.metric.split(' - ');
            const height = dogDetail.height.metric.split(' - ');
            const life_span = dogDetail.life_span.match(/\d+/g);
            setInputValue({
                ...newDog,
                id: id,
                imageUrl: dogDetail.imageUrl,
                name: dogDetail.name,
                weightMin: weight[0],
                weightMax: weight[1],
                heightMin: height[0],
                heightMax: height[1],
                life_spanMin: life_span[0],
                life_spanMax: life_span[1],
                temperamentsTexArea: dogDetail.temperament
            })
            setIsEditing(true);
        }else{

        }
    },[id])

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

        if (id) {
            const life_span = `${newDog.life_spanMin} - ${newDog.life_spanMax} years`;
            const createNewDog = {
                id: id,
                imageUrl: newDog.imageUrl,
                name: newDog.name,
                life_span: life_span,
                temperament: newDog.temperamentsTexArea
            }
            const postNewDog = {...createNewDog, ...systemNewDog()}
            console.log(postNewDog);
            dispatch(updateDog(postNewDog))
            navigate(`/detail/${id}`)
        }else{
            const life_span = `${newDog.life_spanMin} - ${newDog.life_spanMax} years`;
            const createNewDog = {
                imageUrl: newDog.imageUrl,
                name: newDog.name,
                life_span: life_span,
                temperament: newDog.temperamentsTexArea
            }
            const postNewDog = {...createNewDog, ...systemNewDog()}
            dispatch(postDog(postNewDog));
            navigate('/home')
        }
        
    };

    const handlerChangeForm = (event) => {
        setInputValue({...newDog, [event.target.name]: event.target.value})
        //setErrors(validation({...userData, [event.target.name]: event.target.value})) 
    }

    const handlerChangeName = (event) => {
        const inputName = event.target.value;
        const formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
        setInputValue({...newDog, name: formattedName});
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

        setInputValue({
            ...newDog,
            temperamentsTexArea: updatedTemperamentsTexArea,
            temperamentInput: '',
        });
        const inputEl = document.querySelector('#autocomplete-input')
        inputEl.value = '';
    }

    const deleteTemperament = (event) => {
        event.preventDefault();
        setInputValue({...newDog, temperamentsTexArea: ''});
    }


    return(
        <div class='main-container-form'>
            <div>
                <form  onSubmit={handlerSubmit} method="post" autocomplete="off" class="register-form">
                    <h2 class="register-title">Agregar Perro</h2>

                    <div class="first-sector">
                        <input onChange={handlerChangeForm} value={newDog.id} class="id" type="text" name="id"/>
                    </div>

                    <div class="first-sector">
                        <input onChange={handlerChangeName} value={newDog.name} required class="name" type="text" name="name" placeholder="Raza"/>
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
                            <option value={newDog.life_spanMin} disabled selected hidden>{newDog.life_spanMin}</option>
                            {optionsLife}
                        </select>
                        <label> - </label>
                        <select name="life_spanMax" id="life_spanMax" onChange={handlerChangeForm}>
                            <option value={newDog.life_spanMax} disabled selected hidden>{newDog.life_spanMax}</option>
                            {optionsLife}
                        </select>
                        <label>years</label>
                    </div>

                    <div class="five-sector">
                        <label>Temperamentos: </label>
                        <div id='autocomplete-wrapper' class='autocomplete-wrapper'>
                            <input id='autocomplete-input' name='temperamentButton' onChange={(event)=>handlerChange(event, temperaments, setInputValue, newDog)} type="text" placeholder='Temperamentos'/>
                        </div>
                        
                        <input onChange={handlerChangeForm} name='temperamentInput' value={newDog.temperamentInput} type="text" placeholder='Otros Temperamentos'/>
                        <button onClick={agreeTemperament}>Agregar</button>
                    </div>

                    <div class="six-sector">
                        <label>Temperamentos escogidos:</label>
                        <textarea name="temperamentsTexArea" value={newDog.temperamentsTexArea} id="" cols="50" rows="1" readOnly></textarea>
                        <button onClick={deleteTemperament}>Limpiar</button>
                    </div>

                    <div>
                    <label for="imagen">Url de la imagen:</label>
                    <input onChange={handlerChangeForm} type="text" value={newDog.imageUrl} id="imageUrl" name="imageUrl"/>
                    </div>

                    <button type="submit" class="register-form-submit">{isEditing ? 'Actualizar' : 'Crear nuevo perro'}</button>
                </form>
            </div>
        </div>
    )

}

export default Form;
