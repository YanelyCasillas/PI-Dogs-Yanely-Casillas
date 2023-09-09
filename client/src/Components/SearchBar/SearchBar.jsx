import './SearchBar.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../Redux/action';

const SearchBar = () => {
    const [name, setname] = useState("")
   
    const handleChange = (event) => {
        setname(event.target.value)
    }

    const dispatch = useDispatch();

    const search = () => {
        dispatch(getDogsByName(name))
    }

    return (
        <div className="main-container-search">
            <div>
                <img  src="" alt="Logo" />
            </div>
            <div >
                <input placeholder="Buscar por raza" type='search' value ={name} onChange={handleChange}/>
                <button onClick={search}>Buscar</button>
            </div>
            
        </div>
    );
}

export default SearchBar;