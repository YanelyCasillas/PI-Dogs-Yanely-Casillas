import './Home.css'
import { useSelector, useDispatch } from 'react-redux';
import DogCard from '../DogCard/DogCard';
import { useEffect, useState } from 'react';
import { getAllApiOrBd, getOrderPeso, getOrderRaza, getTemperaments, getListDogsTemperament } from '../../Redux/action';
import handlerChange from '../getTemperamentButton';
import Paginacion from './Paginacion';

const Home = () => {
   const [inputValue, setInputValue] = useState('');

   const temperaments = useSelector((state)=> state.temperaments);
   const dogfilter = useSelector((state) => state.dogfilter); 
   const [currentPage, setCurrentPage] = useState(1);
   const [dogsPerPage] = useState(10);

   //get current dogs
   const indexOfLastDogs = currentPage * dogsPerPage;
   const indexOfFirstDogs = indexOfLastDogs - dogsPerPage;
   const currentDogs = dogfilter.slice(indexOfFirstDogs, indexOfLastDogs);

   //change page
   const paginate = pageNumber => setCurrentPage(pageNumber)

   const dispatch = useDispatch();

   const handlerButton = (apiOrBd) => {
      dispatch(getAllApiOrBd(apiOrBd));
   }
   
   const handleOrderRaza = (event) => {
      dispatch(getOrderRaza(event.target.value))
      event.target.value='';
   }

   const handleOrderPeso = (event) => {
      dispatch(getOrderPeso(event.target.value))
      event.target.value='';
   }

   const getListDogs = (event) => {
      event.preventDefault();
      dispatch(getListDogsTemperament(inputValue));
      const inputEl = document.querySelector('#autocomplete-input')
      inputEl.value = '';
   }

    useEffect(()=>{
      dispatch(getTemperaments());
    },[])

   return (
      <div class ='main-container-home'>
         <div class='container-nav'>
            <nav class='nav-secondary'>
               <ul class ='nav-list'>
                  <li class='nav-item'>
                     <button onClick={()=>handlerButton('api')}>Api</button></li>
                  <li class='nav-item'>
                     <button onClick={()=>handlerButton('bd')}>Base de Datos</button></li>
                  <li class='nav-item'>
                     <button onClick={()=>handlerButton('all')}>Todo</button></li>
               </ul>
            </nav>
         </div>

         <div class='filter-container'>
            <select class="" onChange={handleOrderRaza}>
               <option value="" disabled selected hidden>Orden por Raza</option>
               <option class=" font-semibold " value="A" >A - Z</option>
               <option class="font-semibold" value="D">Z - A</option>
            </select>

            <select class=""  onChange={handleOrderPeso}>
               <option value="" disabled selected hidden>Orden por Peso</option>
               <option class=" font-semibold " value="A" >Menor a Mayor</option>
               <option class="font-semibold" value="D">Mayor a Menor</option>
            </select>

            <form onSubmit={getListDogs} autocomplete="off">
               <div id='autocomplete-wrapper' class='autocomplete-wrapper'>
               <input id='autocomplete-input' onChange={(event)=>handlerChange(event, temperaments, setInputValue)} type="text" placeholder='Temperamentos'/>
               </div>
               <button type='submit'>Buscar</button>
            </form>
         </div>

         <div>
            {
               currentDogs.map(({id, imageUrl, name, weight, height, life_span, temperament}) => {
                  return(
                     <DogCard
                        key={id}
                        id={id}
                        name={name}
                        weightImperial={weight.imperial}
                        weightMetric={weight.metric}
                        heightImperial={height.imperial}
                        heightMetric={height.metric}
                        life_span={life_span}
                        temperament={temperament}
                        imageUrl={imageUrl}
                     />
                  )
               })
            }
         </div>
         <Paginacion dogsPerPage={dogsPerPage} totalDogs={dogfilter.length} paginate={paginate}/>
      </div>
      
   )

}

export default Home;