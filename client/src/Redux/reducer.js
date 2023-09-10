import { GET_ALLDOGS, GET_DOGSBYNAME, GET_DOGSBYID, GET_TEMPERAMENTS, GET_ALL_API_OR_BD, GET_ORDER_PESO, GET_ORDER_RAZA, GET_LIST_DOGS_TEMPERAMENT, POST_DOG } from "./action-types";

const initialState = {
    allDogs: [],//original
    dogfilter: [],//copia
    dogDetail: [],
    temperaments: [],
    postDog: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALLDOGS:
            return{
                ...state,
                allDogs: action.payload,
                dogfilter: action.payload
            };
        case GET_DOGSBYNAME:
            return{
                ...state,
                allDogs: action.payload,
                dogfilter: action.payload
            };
        case GET_DOGSBYID:
            return{
                ...state,
                dogDetail: action.payload
            };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            };
        case GET_ALL_API_OR_BD:
            return{
                ...state,
                dogfilter: action.payload === 'api' ? state.allDogs.filter((dog) => typeof dog.id === 'number' )
                : action.payload === 'bd'?  state.allDogs.filter((dog) => typeof dog.id !== 'number' )
                : state.allDogs
            };
        case GET_ORDER_PESO:
            return{
                ...state,
                dogfilter: action.payload === 'A' 
                ? [...state.dogfilter].sort((a, b) => {
                    const weightA = parseFloat(a.weight.metric.split(' - ')[0]);
                    const weightB = parseFloat(b.weight.metric.split(' - ')[0]);
                    return weightA - weightB;
                  })
                : [...state.dogfilter].sort((a, b) => {
                    const weightA = parseFloat(a.weight.metric.split(' - ')[0]);
                    const weightB = parseFloat(b.weight.metric.split(' - ')[0]);
                    return weightB - weightA;
                  }),
            };
        case GET_ORDER_RAZA:
            return{
                ...state,
                dogfilter: action.payload === 'A' ? [...state.dogfilter].sort((a, b) => a.name.localeCompare(b.name))
                : [...state.dogfilter].sort((a, b) => b.name.localeCompare(a.name))
            };
         
        case GET_LIST_DOGS_TEMPERAMENT:
            let dogsFilter = state.allDogs.filter((d)=>{
                if (d.temperament) {
                    let dogsTemperaments = d.temperament.split(', ');
                    return dogsTemperaments.includes(action.payload);
                }
                
            })
            return{
                ...state,
                dogfilter: dogsFilter
            };
        case POST_DOG:
            return{
                ...state,
                postDog: action.payload
            };
        default: return {...state}
    }

}

export default reducer;