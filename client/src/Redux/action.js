import { GET_ALLDOGS, GET_DOGSBYNAME, GET_DOGSBYID, GET_TEMPERAMENTS, GET_ALL_API_OR_BD, GET_ORDER_PESO, GET_ORDER_RAZA, GET_LIST_DOGS_TEMPERAMENT } from "./action-types";
import axios from 'axios';

export const getAllDogs = () => {
    try {
        const endpoint = 'http://localhost:3001/dogs';
        return async(dispatch) => {
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: GET_ALLDOGS,
                payload: data,
            });
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const getDogsByName = (name) => {
    try {
        const endpoint = `http://localhost:3001/dogs/name?name=${name}`;
        return async(dispatch) => {
            const {data} = await axios.get(endpoint);
            console.log(data);
            if (data.length > 0) {
                return dispatch({
                    type: GET_DOGSBYNAME,
                    payload: data,
                });
            }else{
                window.alert('El perro no existe');
            }
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const getDogsById = (id) => {
    try {
        if (id) {
            const endpoint = `http://localhost:3001/dogs/${id}`;
            return async(dispatch) => {
                const {data} = await axios.get(endpoint);
                return dispatch({
                    type: GET_DOGSBYID,
                    payload: data,
                });
            };
        }else{
            return ({
                type: GET_DOGSBYID,
                payload: {},
            });
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getTemperaments = () => {
    try {
        const endpoint = `http://localhost:3001/temperaments`;
        return async(dispatch) => {
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: data,
            });
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllApiOrBd = (apiOrBd) => {
    return {type: GET_ALL_API_OR_BD, payload: apiOrBd}
}

export const getOrderPeso = (order) => {
    return {type: GET_ORDER_PESO, payload: order}
}


export const getOrderRaza = (order) => {
    return {type: GET_ORDER_RAZA, payload: order}
}

export const getListDogsTemperament = (temperament, allTemperaments, dogfilter) => {
    console.log(temperament);
    if (allTemperaments.includes(temperament)) {
        let dogsFilter = dogfilter.filter((d)=>{
            if (d.temperament) {
                let dogsTemperaments = d.temperament.split(', ');
                return dogsTemperaments.includes(temperament);
            }
        })
        if (dogsFilter.length === 0) {
            window.alert('No hay un perro con ese temperamento');
        }else{
            return {type: GET_LIST_DOGS_TEMPERAMENT, payload: dogsFilter}
        } 
    }else{
        window.alert('No existe ese temperamento');
    }
}

export const postDog = (postNewDog) => {
    try {
        const endpoint = 'http://localhost:3001/dogs';
        return async(dispatch) => {
            const {data} = await axios.post(endpoint, postNewDog);
            if (data) {
                window.alert(data);
            }
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDog = (id) => {
    try {
        const endpoint = `http://localhost:3001/dogs/${id}`;
        return async(dispatch) => {
            const {data} = await axios.delete(endpoint);
            if (data) {
                window.alert(data);
            }
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const updateDog = (newDog) => {
    try {
        const endpoint = 'http://localhost:3001/dogs';
        return async(dispatch) => {
            const {data} = await axios.put(endpoint, newDog);
            if (data) {
                window.alert(data);
            }
        };
    } catch (error) {
        console.log(error.message);
    }
}
