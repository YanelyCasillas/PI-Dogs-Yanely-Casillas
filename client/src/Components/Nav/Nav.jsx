import './Nav.css'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import { getAllDogs } from '../../Redux/action';
import { useDispatch } from "react-redux";


const Nav = ({logOut}) => {

    const dispatch = useDispatch();
    const allDogsHome = () => {
        dispatch(getAllDogs());
    }

    return(
        <div className='main-container-nav'>
            <SearchBar/>
            <div className='container-button'>
                <Link to='/home'><button onClick={allDogsHome}>HOME</button></Link>
                <Link to='/form'><button>ADD DOG</button></Link>
                <button onClick= {()=>{logOut()}}>LOG OUT</button>
            </div>
        </div>
    )

}

export default Nav;