import axios from '../../axios-orders';

import * as actionTypes from './actionsTypes';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setIngredients = () => (dispatch) => {
	axios
		.get('https://yanni-react-my-burger.firebaseio.com/ingredients.json')
		.then((response) => {
			dispatch({
				type: actionTypes.SET_INGREDIENTS,
				ingredients: response.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: actionTypes.FETCH_INGREDIENTS_FAILED,
			});
		});
};
