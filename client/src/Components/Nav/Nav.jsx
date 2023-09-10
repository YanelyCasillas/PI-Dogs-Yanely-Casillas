import './Nav.css'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import { getAllDogs } from '../../Redux/action';
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';


const Nav = ({logOut}) => {
    const location = useLocation();
    const pathLocation = location.pathname;
    const dispatch = useDispatch();
    const allDogsHome = () => {
        dispatch(getAllDogs());
    }

    return(
        <div>
            {pathLocation === '/home' && <SearchBar/>}
            <div>
                <Link to='/home'><button onClick={allDogsHome}>HOME</button></Link>
                <Link to='/form'><button>ADD DOG</button></Link>
                <button onClick= {()=>{logOut()}}>LOG OUT</button>
            </div>
            
        </div>
    )

}

export default Nav;