import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemperaments, postDog, updateDog, getDogsById } from '../../Redux/action';
import handlerChange from '../getTemperamentButton';
import validation from "./validation";

const Form = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const dogDetail = useSelector((state)=>state.dogDetail);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const temperaments = useSelector((state)=> state.temperaments);

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
        }
    },[id])

    const optionsLife = [];
    for (let i = 1; i <= 25; i++) {
        optionsLife.push(<option key={i} value={i}>{i}</option>);
    }

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
            dispatch(updateDog(postNewDog));
            dispatch(getDogsById(id));
            setTimeout(() => {
                navigate(`/detail/${id}`)
              }, 150);
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
            setInputValue({imageUrl: '',
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
            temperamentsTexArea: ''})
        }
    };

    const handlerChangeForm = (event) => {
        setInputValue({...newDog, [event.target.name]: event.target.value})
        setErrors(validation({...newDog, [event.target.name]: event.target.value})) 
    }

    const handlerChangeName = (event) => {
        const inputName = event.target.value;
        const formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
        setInputValue({...newDog, name: formattedName});
        setErrors(validation({...newDog, [event.target.name]: inputName}));
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
            temperamentButton: ''
        });
        const inputEl = document.querySelector('#autocomplete-input')
        inputEl.value = '';
        setErrors(validation({...newDog, temperamentsTexArea: updatedTemperamentsTexArea})) 
    }

    const deleteTemperament = (event) => {
        event.preventDefault();
        setInputValue({...newDog, temperamentsTexArea: ''});
        setErrors(validation({...newDog, temperamentsTexArea: ''})) 
    }

    const isFormValid = (errors.name ||
    errors.measuringSystem ||
    errors.weightMax ||
    errors.heightMax||
    errors.life_spanMax ||
    errors.temperamentInput ||
    errors.temperamentsTexArea ||
    errors.imageUrl || !newDog.measuringSystem
    || !newDog.imageUrl || !newDog.weightMin
    || !newDog.weightMax || !newDog.heightMin
    || !newDog.heightMax || !newDog.life_spanMin
    || !newDog.life_spanMax);

    const cancel = (event) => {
        event.preventDefault();
        if (id) {
            navigate(`/detail/${id}`);
        }else{
            navigate('/home');
        }
    }

    return(
        <div className='main-container-form'>
            <div className='wrapper'>
                <div className='form-box'>
                    <h2 class="register-title">{isEditing ? 'Actualizar' : 'Registrar'}</h2>
                    <form  onSubmit={handlerSubmit} method="post" autocomplete="off" className="register-form">

                        <div>
                            <input onChange={handlerChangeForm} value={newDog.id} className="id" type="text" name="id"/>
                        </div>

                        <div className="first-sector">
                            <label>Raza: </label>
                            <input onChange={handlerChangeName} value={newDog.name} required className="name" type="text" name="name" placeholder="Raza"/>
                            <br />
                            <span>{errors.name && errors.name}</span>
                        </div>

                        <div className="second-sector">
                            <div className='measuringSystem'>
                                <label>Sistema de medición:</label>
                                <label>
                                    <input onChange={handlerChangeForm} checked={newDog.measuringSystem === 'imperial'} type="radio" name='measuringSystem' value='imperial' /> Imperial </label>
                                <label>
                                    <input onChange={handlerChangeForm} checked={newDog.measuringSystem === 'metric'} type="radio" name='measuringSystem' value='metric' /> Metric </label>
                            </div>

                            <span>{errors.measuringSystem && errors.measuringSystem}</span>
                        </div>

                        <div className="three-sector">
                            <div>
                                <label class=''>Peso: </label>
                                <input onChange={handlerChangeForm} name='weightMin' value={newDog.weightMin} type="number" />
                                <label> - </label>
                                <input onChange={handlerChangeForm} name='weightMax' value={newDog.weightMax} type="number" />
                            </div>

                            <span>
                                {errors.weightMax && errors.weightMax}
                            </span>
                        </div>

                        <div className="three-sector">
                            <div>
                                <label>Altura: </label>
                                <input onChange={handlerChangeForm} name='heightMin' value={newDog.heightMin} type="number" />
                                <label> - </label>
                                <input onChange={handlerChangeForm} name='heightMax' value={newDog.heightMax} type="number" />
                            </div>

                            <span>
                                {errors.heightMax && errors.heightMax}
                            </span>
                        </div>

                        <div className="four-sector">
                            <div>
                                <label>Tiempo de vida: </label>
                                <select name="life_spanMin" id="life_spanMin" value={newDog.life_spanMin} onChange={handlerChangeForm}>
                                    <option value='' hidden></option>
                                    {optionsLife}
                                </select>
                                <label> - </label>
                                <select name="life_spanMax" id="life_spanMax" value={newDog.life_spanMax} onChange={handlerChangeForm}>
                                    <option hidden></option>
                                    {optionsLife}
                                </select>
                                <label>years</label>
                            </div>

                            <span>
                                {errors.life_spanMax && errors.life_spanMax}
                            </span>
                        </div>

                        <div className="five-sector">
                            <label>Temperamentos: </label>

                            <div id='autocomplete-wrapper' className='autocomplete-wrapper'>
                                <input id='autocomplete-input' name='temperamentButton'  onChange={(event)=>handlerChange(event, temperaments, setInputValue, newDog)} type="text" placeholder='Temperamentos'/>
                            </div>
                            
                            <input onChange={handlerChangeForm} name='temperamentInput'value={newDog.temperamentInput} type="text" placeholder='Otros Temperamentos'/>
                            <span>{errors.temperamentInput && errors.temperamentInput}</span>
                            <button disabled={errors.temperamentInput} className="form-button agree" onClick={agreeTemperament}>Agregar</button>
                        </div>

                        <div className="six-sector">
                            <label>Temperamentos escogidos:</label>
                            <textarea name="temperamentsTexArea" value={newDog.temperamentsTexArea} id="" cols="70" rows="1" readOnly></textarea>
                            <span>{errors.temperamentsTexArea && errors.temperamentsTexArea}</span>
                            <button className="form-button" onClick={deleteTemperament}>Limpiar</button>
                        </div>

                        <div className="seven-sector">
                            <label for="imagen">Url de la imagen: </label>
                            <input onChange={handlerChangeForm} type="text" value={newDog.imageUrl} id="imageUrl" name="imageUrl"/>
                            <span>{errors.imageUrl && errors.imageUrl}</span>
                        </div>

                        <button type="submit" disabled={isFormValid} className="form-button button-submit">{isEditing ? 'Actualizar' : 'Crear nuevo perro'}</button>
                        <button onClick={cancel} className="form-button button-submit">Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
