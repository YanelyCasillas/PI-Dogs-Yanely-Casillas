import './Home.css'
import { useSelector, useDispatch } from 'react-redux';
import DogCard from '../DogCard/DogCard';
import { useEffect, useState } from 'react';
import { getAllApiOrBd, getOrderPeso, getOrderRaza, getTemperaments, getListDogsTemperament } from '../../Redux/action';
import handlerChange from '../getTemperamentButton';
import Paginacion from './Paginacion';

const Home = () => {
   const [inputValue, setInputValue] = useState('');
   const [dataSource, setDataSource] = useState('');
   const [page, setPage] = useState(1);
   const [dogsPerPage] = useState(8);

   const dispatch = useDispatch();

   const temperaments = useSelector((state)=> state.temperaments);
   const dogfilter = useSelector((state) => state.dogfilter); 

   const maximo = dogfilter.length/dogsPerPage;
   const currentDogs = dogfilter.slice((page - 1) * dogsPerPage, (page - 1) * dogsPerPage + dogsPerPage);

   const handlerButton = (apiOrBd) => {
      setDataSource(apiOrBd)
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
      const inputEl = document.querySelector('#autocomplete-input')
      inputEl.value = '';
      dispatch(getListDogsTemperament(inputValue, temperaments, dogfilter));
      setInputValue('')
   }

    useEffect(()=>{
      dispatch(getTemperaments());
    },[])
   
   return (
      <div className ='main-container-home'>
         <div className='container-nav'>
            <div className='nav-secondary'>
               <ul className ='nav-list'>
                  <li className='nav-item'>
                     <button onClick={()=>handlerButton('api')}>Api</button></li>
                  <li className='nav-item'>
                     <button onClick={()=>handlerButton('bd')}>Base de Datos</button></li>
                  <li className='nav-item'>
                     <button onClick={()=>handlerButton('all')}>Todo</button></li>
               </ul>
            </div>
         </div>

         <div className='filter-container'>
            <select className="" onChange={handleOrderRaza}>
               <option value="" disabled selected hidden>Orden por Raza</option>
               <option className="filter-option " value="A" >A - Z</option>
               <option className="filter-option" value="D">Z - A</option>
            </select>

            <select className=""  onChange={handleOrderPeso}>
               <option value="" disabled selected hidden>Orden por Peso</option>
               <option className="filter-option" value="A" >Menor a Mayor</option>
               <option className="filter-option" value="D">Mayor a Menor</option>
            </select>

            <form onSubmit={getListDogs} autocomplete="off">
               <div id='autocomplete-wrapper' className='autocomplete-wrapper'>
                  <input className='temperament-input' id='autocomplete-input' onChange={(event)=>handlerChange(event, temperaments, setInputValue)} type="text" placeholder='Temperamentos'/>
               </div>
               
               <button className='temperament-button' type='submit' >Buscar</button>
            </form>
         </div>

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
         
         <Paginacion page={page} setPage={setPage} maximo={maximo} dataSource={dataSource}/>
         
      </div>
      
   )

}

export default Home;