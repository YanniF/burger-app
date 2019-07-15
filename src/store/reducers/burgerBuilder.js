import * as actionType from '../actions/actionsTypes';

const initialState = {
	ingredients: null,
	totalPrice: 2,
	error: false,
	building: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.6,
	meat: 1.4,
	bacon: 0.7,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true,
			};
		case actionType.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true,
			};
		case actionType.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 2,
				error: false,
				building: false,
			};
		case actionType.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			};
		default:
			return state;
	}
};

export default reducer;
