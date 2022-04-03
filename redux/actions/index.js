import axios from 'axios';

import { 
  GET_PRODUCTS, 
  RESTORE_STATE,
 } from '../constants.js'

export function getProducts() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://192.168.0.230:3001/product");
      dispatch( {
        type: GET_PRODUCTS,
        payload: data,
      })
    } catch (error) {
      //alert("we can't connect with server");
      console.log(error);
    }
  }
}

// restore state
export function restoreState() {
  return {
    type: RESTORE_STATE,
    payload: [],
  };
}