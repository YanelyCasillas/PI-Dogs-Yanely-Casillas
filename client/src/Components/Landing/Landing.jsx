import './Landing.css';

const Landing = ({handleAccess}) => {
    return(
        <div className='fondo'>
            <div className='main-conteiner'>
                <h1 className='title'>Bienvenidos</h1>
                <button onClick={handleAccess} className='btnGetIn'>INGRESAR</button>
            </div>
        </div>
    )
}

export default Landing;