import './DogCard.css';
import { NavLink } from "react-router-dom";

const DogCard = ({id, name, weightImperial, weightMetric, heightImperial, heightMetric, life_span, temperament, imageUrl}) => {
    return(
        <NavLink to={`/detail/${id}`} className='main-container-dog'>
            <div>
                <h2>{`Raza: ${name}`}</h2>
                <h2>Peso</h2>
                <h2>{`Imperial: ${weightImperial}`}</h2>
                <h2>{`Metric: ${weightMetric}`}</h2>
                <h2>Altura</h2>
                <h2>{`Imperial: ${heightImperial}`}</h2>
                <h2>{`Metric: ${heightMetric}`}</h2>
                <h2>{`Tiempo de vida: ${life_span}`}</h2>
                <h2>{`Temperamento: ${temperament}`}</h2>
                <img src={imageUrl} />
            </div>
        </NavLink>
        
    )

}

export default DogCard;