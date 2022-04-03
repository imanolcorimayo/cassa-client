import { 
  GET_PRODUCTS, 
  RESTORE_STATE,
 } from '../constants.js'

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: "This is the test product",
  };
  /* return async function (dispatch) {
    try {
      const data = "This is the test product"
      dispatch({
        type: GET_PRODUCTS, 
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  } */
}

// restore state
export function restoreState() {
  return {
    type: RESTORE_STATE,
    payload: [],
  };
}