import * as actionTypes from "./Shopping-types";
import * as ProductTypes from "../Products/Products-types";

export const addToCart = (itemID, value) => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			id: itemID,
			qty: value,
		},
	};
};

export const removeFromCart = (itemID) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: {
			id: itemID,
		},
	};
};

export const addQty = (itemID, value) => {
	return {
		type: actionTypes.ADD_QTY,
		payload: {
			id: itemID,
			qty: value,
		},
	};
};

export const subQty = (itemID, value) => {
	return {
		type: actionTypes.SUB_QTY,
		payload: {
			id: itemID,
			qty: value,
		},
	};
};

// Get product from database ======================================
export const getProducts = () => {
	return {
		type: ProductTypes.GET_PRODUCTS,
	};
};

export const getProductsSuccess = (datas) => {
	return {
		type: ProductTypes.GET_PRODUCTS_SUCCESS,
		payload: datas,
	};
};

export const getProductsFailed = () => {
	return {
		type: ProductTypes.GET_PRODUCTS_FAILED,
	};
};

export function fetchProducts(dispatch) {
	return async (dispatch) => {
		dispatch(getProducts());

		try {
			const res = await fetch("http://127.0.0.1:8000/api/products");
			const data = await res.json();

			dispatch(getProductsSuccess(data.data));
		} catch (e) {
			dispatch(getProductsFailed(e));
		}
	};
}
