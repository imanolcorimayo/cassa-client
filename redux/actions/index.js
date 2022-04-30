import axios from "axios";

import {
    GET_PRODUCTS,
    GET_SALES,
    RESTORE_STATE,
    SHOW_PRODUCT_MODAL,
    REORDER_PRODUCTS,
    NEW_STOCK_PRODUCTS,
} from "../constants.js";

// PRODUCTS

export function getProducts() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://192.168.0.230:3001/product");
            dispatch({
                type: GET_PRODUCTS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// SALES

export function getSales() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get("http://192.168.0.230:3001/sales");
            dispatch({
                type: GET_SALES,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function reorderProducts(id) {
    return {
        type: REORDER_PRODUCTS,
        payload: id,
    };
}

export function newStockProducts(id, quantity) {
    return {
        type: NEW_STOCK_PRODUCTS,
        payload: { id, quantity },
    };
}

// OTHERS

// restore state
export function restoreState() {
    return {
        type: RESTORE_STATE,
        payload: [],
    };
}

// Change visibility of modal
export function showProductModal(id) {
    return {
        type: SHOW_PRODUCT_MODAL,
        payload: id ? id : [],
    };
}
