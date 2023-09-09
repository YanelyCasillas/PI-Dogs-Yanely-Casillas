import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getDogsById } from '../../Redux/action';
import './Detail.css';

const Detail = () => {
    const { id } = useParams();

    const dogDetail = useSelector((state)=>state.dogDetail);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogsById(id))
    },[])

    return(
        <div className='main-container-detail'>
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