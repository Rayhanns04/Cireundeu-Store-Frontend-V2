import * as actionTypes from "./Shopping-types";
// import allProducts from "../../api/AllMenuData.json";
import * as ProductTypes from "../Products/Products-types";

const INITIAL_STATE = {
	products: [],
	loading: false,
	hasErrors: false,
	cart: [],
	currentItem: null,
	qty: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			// Get the items data from the product array
			const item = state.products.find(
				(item) => item.id === action.payload.id
			);

			// Check if item in cart already or same product
			const inCart = state.cart.find((item) =>
				item.id === action.payload.id ? true : false
			);

			console.log(`Action Payload: ${action.payload.qty}`);
			console.log("Success");

			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
							item.id === action.payload.id
								? {
										...item,
										qty: item.qty + action.payload.qty,
								  }
								: item
					  )
					: [...state.cart, { ...item, qty: action.payload.qty }],
			};

		case actionTypes.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.id !== action.payload.id
				),
			};

		case actionTypes.ADD_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? { ...item, qty: action.payload.qty + 1 }
						: item
				),
			};

		case actionTypes.SUB_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? action.payload.qty <= 1
							? { ...item, qty: 1 }
							: { ...item, qty: action.payload.qty - 1 }
						: item
				),
			};

		// Rest Api ======================================
		case actionTypes.LOAD_CURRENT_ITEM:
			return {
				...state,
				currentItem: action.payload,
			};

		case ProductTypes.GET_PRODUCTS:
			return {
				...state,
				loading: false,
				hasErrors: false,
			};

		case ProductTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload,
				loading: false,
				hasErrors: false,
			};

		case ProductTypes.GET_PRODUCTS_FAILED:
			return {
				...state,
				loading: false,
				hasErrors: false,
			};

		default:
			return state;
	}
};

export default shopReducer;
