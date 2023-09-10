import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { deleteDog, getDogsById } from '../../Redux/action';
import { useNavigate} from 'react-router-dom';
import './Detail.css';

const Detail = () => {
    const { id } = useParams();


    const dogDetail = useSelector((state)=>state.dogDetail);
    

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogsById(id))
    },[])

    const deleteDogButton = () => {
        dispatch(deleteDog(id));
    }

    const navigate = useNavigate();

    const updateDogButton = () => {
        navigate(`/form/${id}`)
    }
 
    return(
        <div class='main-container-detail'>
            {id != parseInt(id) && (<button onClick={deleteDogButton}>Eliminar</button>)}
            {id != parseInt(id) && (<button onClick={updateDogButton}>Actualizar</button>)}
            <h2>Raza: {dogDetail.name && dogDetail.name}</h2>
            <h2>Peso</h2>
            <h2>Imperial: {dogDetail.weight?.imperial && dogDetail.weight?.imperial}</h2>
            <h2>Metric: {dogDetail.weight?.metric && dogDetail.weight?.metric}</h2>
            <h2>Altura</h2>
            <h2>Imperial: {dogDetail.height?.imperial && dogDetail.height?.imperial}</h2>
            <h2>Metric: {dogDetail.height?.metric && dogDetail.height?.metric}</h2>
            <h2>Tiempo de vida: {dogDetail.life_span && dogDetail.life_span}</h2>
            <h2>Temperamento: {dogDetail.temperament && dogDetail.temperament}</h2>
            <img src={dogDetail.imageUrl} />
        </div>
    );

}

export default Detail;