import { GET_ALLDOGS, GET_DOGSBYNAME, GET_DOGSBYID, GET_TEMPERAMENTS, GET_ALL_API_OR_BD, GET_ORDER_PESO, GET_ORDER_RAZA, GET_LIST_DOGS_TEMPERAMENT, POST_DOG } from "./action-types";
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
            return dispatch({
                type: GET_DOGSBYNAME,
                payload: data,
            });
        };
    } catch (error) {
        console.log(error.message);
    }
}

export const getDogsById = (id) => {
    try {
        const endpoint = `http://localhost:3001/dogs/${id}`;
        return async(dispatch) => {
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: GET_DOGSBYID,
                payload: data,
            });
        };
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

export const getListDogsTemperament = (temperament) => {
    return {type: GET_LIST_DOGS_TEMPERAMENT, payload: temperament}
}

export const postDog = (postNewDog) => {
    try {
        const endpoint = 'http://localhost:3001/dogs';
        return async(dispatch) => {
            const {data} = await axios.post(endpoint, postNewDog);
            return dispatch({
                type: POST_DOG,
                payload: data,
            });
        };
    } catch (error) {
        console.log(error.message);
    }
}
