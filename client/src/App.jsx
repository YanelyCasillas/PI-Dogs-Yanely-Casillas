import './App.css'
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';
import Nav from './Components/Nav/Nav';
import { getAllDogs } from './Redux/action';
import { useSelector, useDispatch } from "react-redux";


function App() {
  const location = useLocation();
  const pathLocation = location.pathname;

  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  const handleAccess = () => {
    setAccess(true);
    navigate('/home')
  }

  const logOut = () => {
    setAccess(false);
    navigate('/');
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllDogs())
  },[])

  return (
    <div >
      {pathLocation !== '/' && <Nav logOut= {logOut}/>}
         <Routes>
          <Route path='/' element={<Landing handleAccess={handleAccess}/>}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/form' element={<Form />}/>
          <Route path='/form/:id' element={<Form />}/>
          <Route path='/detail/:id' element={<Detail/>}/>
         </Routes>
    </div>
  )
}

export default App
