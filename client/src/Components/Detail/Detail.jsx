import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { deleteDog, getDogsById, getAllDogs, getAllApiOrBd } from '../../Redux/action';
import { useNavigate} from 'react-router-dom';
import './Detail.css';
import Loader from "../Loader/Loader";

const Detail = () => {
    const { id } = useParams();

    const dogDetail = useSelector((state)=>state.dogDetail);
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDogs());
        dispatch(getDogsById(id));
    },[])

    const navigate = useNavigate();
    
    const deleteDogButton = () => {
        dispatch(deleteDog(id));
        dispatch(getAllDogs());
        navigate('/home');
    }

    const updateDogButton = () => {
        navigate(`/form/${id}`);
    }

    const goBack = () => {
        dispatch(getDogsById());
        if (id != parseInt(id)) {
            dispatch(getAllApiOrBd('bd'));
        }else{
            dispatch(getAllApiOrBd('api'));
        }
        navigate('/home');
    }
 
    return(
        <div>
            {!dogDetail.name ? <Loader /> : (
                <div className='main-container-detail'>
                    <div className='div-go-back'>
                        <button className='go-back' onClick={goBack}>Regresar</button>
                    </div>
                    <div className='container-detail'>
                        <div className='data-detail'>
                            <p className='raza-detail'>{dogDetail.name && dogDetail.name}</p>
                            <span>Peso: </span>
                            <ul>
                                <li><span>Imperial: </span>{dogDetail.weight?.imperial && dogDetail.weight?.imperial}</li>
                                <li><span>Metric: </span>{dogDetail.weight?.metric && dogDetail.weight?.metric}</li>
                            </ul>
                            <span>Altura: </span>
                            <ul>
                                <li><span>Imperial: </span>{dogDetail.height?.imperial && dogDetail.height?.imperial}</li>
                                <li><span>Metric: </span>{dogDetail.height?.metric && dogDetail.height?.metric}</li>
                            </ul>
                            <p><span>Tiempo de vida: </span>{dogDetail.life_span && dogDetail.life_span}</p>
                            <p><span>Temperamento: </span>{dogDetail.temperament && dogDetail.temperament}</p>
                        </div>
                        
                        <div className='container-img-detail'>
                            <img className='img-detail'src={dogDetail.imageUrl} />
                        </div>
                    </div>
                    
                    <div className='container-button-detail'>
                        {id != parseInt(id) && (<button onClick={updateDogButton}>Actualizar</button>)}
                        {id != parseInt(id) && (<button onClick={deleteDogButton}>Eliminar</button>)}
                    </div>
                </div>
            )}
        </div>
    );

}

export default Detail;