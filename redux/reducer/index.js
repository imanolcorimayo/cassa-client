import { 
    GET_PRODUCTS,
    RESTORE_STATE
} from '../constants.js'

const initialState = {
    products: [],
};

function rootReducer(state = initialState, action) {
    
    if (action.type === GET_PRODUCTS) {
        return {
            ...state,
            products: action.payload
        }
    } else 
    if(action.type === RESTORE_STATE) {
        return initialState
    }
    return state;
}

export default rootReducer;