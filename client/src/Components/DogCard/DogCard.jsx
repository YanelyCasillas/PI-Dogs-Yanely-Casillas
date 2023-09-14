import './DogCard.css';
import { NavLink } from "react-router-dom";

const DogCard = ({id, name, weightMetric, temperament, imageUrl}) => {
    return(
        <div className='container-card'>
            <div className="card">
                <img className="img-card"src={imageUrl} />
                <div className='intro'>
                    <h1 className='raza-card'>{name}</h1>
                    <p><span>Peso Metric:</span> {weightMetric}</p>
                    <p><span>Temperamentos: </span>{temperament}</p>
                    <NavLink className='home-detail-card' to={`/detail/${id}`}>
                        <p >Ver detalle</p>
                    </NavLink>
                </div>
            </div>
        </div>  
    )
}

export default DogCard;