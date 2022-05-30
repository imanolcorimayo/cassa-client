import {
  GET_PRODUCTS,
  RESTORE_STATE,
  SHOW_PRODUCT_MODAL,
  REORDER_PRODUCTS,
  NEW_STOCK_PRODUCTS,
  GET_SALES,
  SHOW_DETAILS_SALES_MODAL,
  GET_TRUSTED,
  SET_SCREEN,
} from "../constants.js";

const initialState = {
  products: [],
  selectProducts: [],
  modal: {
    visibility: false,
    product: [],
  },
  sales: [],
  newSell: {
    products: [],
  },
  detailsSalesModal: {
    show: false,
    products: [],
  },
  trusted: [],
  screen: "sell",
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
      selectProducts: action.payload,
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
  } else if (action.type === REORDER_PRODUCTS) {
    let product = state.products.filter((el) => el.id === action.payload);
    let rest = state.products.filter((el) => el.id !== action.payload);
    let productsReordered = [...rest, ...product];
    return { ...state, products: productsReordered };
  } else if (action.type === NEW_STOCK_PRODUCTS) {
    let newProduct;
    let products = state.products.map((el) => {
      let newQuantity;
      if (el.id === action.payload.id) {
        newQuantity = el.quantity - action.payload.quantity;

        newProduct = action.payload.quantity ? [{ ...el, quantity: action.payload.quantity }] : [];
        return { ...el, quantity: newQuantity };
      }
      return el;
    });
    return {
      ...state,
      selectProducts: products,
      newSell: { ...state.newSell, products: [...state.newSell.products, ...newProduct] },
    };
  } else if (action.type === GET_SALES) {
    return {
      ...state,
      sales: action.payload,
    };
  } else if (action.type === SHOW_DETAILS_SALES_MODAL) {
    return {
      ...state,
      detailsSalesModal: action.payload,
    };
  } else if (action.type === GET_TRUSTED) {
    return {
      ...state,
      trusted: action.payload,
    };
  } else if (action.type === SET_SCREEN) {
    return {
      ...state,
      screen: action.payload,
    };
  } else if (action.type === RESTORE_STATE) {
    return initialState;
  }
  return state;
}

export default rootReducer;
