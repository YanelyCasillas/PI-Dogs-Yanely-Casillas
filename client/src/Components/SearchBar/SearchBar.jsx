import './SearchBar.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../Redux/action';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const location = useLocation();
    const pathLocation = location.pathname;

    const [name, setname] = useState("")
   
    const handleChange = (event) => {
        setname(event.target.value)
    }

    const dispatch = useDispatch();

    const search = () => {
        dispatch(getDogsByName(name))
        setname('')
    }

    return (
        <div className="main-container-search">
            <div className='container-logo' >
                <img src="../../../image/logo.png" alt="Logo" />
            </div>
            {pathLocation === '/home' && <input placeholder="Buscar por raza" type='search' value ={name} onChange={handleChange}/>}
            {pathLocation === '/home' && <button onClick={search}>Buscar</button>}
        </div>
    );
}

export default SearchBar;