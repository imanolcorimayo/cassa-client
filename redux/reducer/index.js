import { GET_PRODUCTS, RESTORE_STATE, SHOW_PRODUCT_MODAL, GET_SALES } from "../constants.js";

const initialState = {
    products: [],
    modal: {
        visibility: false,
        product: [],
    },
    sales: [],
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_PRODUCTS) {
        return {
            ...state,
            products: action.payload,
        };
    } else if (action.type === SHOW_PRODUCT_MODAL) {
        return {
            ...state,
            sales: action.payload,
        };
    } else if (action.type === SHOW_PRODUCT_MODAL) {
        let product = [[]];
        if (typeof action.payload === "number") {
            product = state.products.filter((el) => el.id === action.payload);
        }
        return { ...state, modal: { visibility: !state.modal.visibility, product: product[0] } };
    } else if (action.type === RESTORE_STATE) {
        return initialState;
    }
    return state;
}

export default rootReducer;
