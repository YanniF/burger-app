import axios from '../../axios-orders';
import * as actionTypes from './actionsTypes';

export const purchaseBurgerSucess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData,
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then((response) => {
				console.log(response.data);
				dispatch(purchaseBurgerSucess(response.data.name, orderData));
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fecthOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders,
	};
};

export const fecthOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	};
};

export const fecthOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = () => {
	return (dispatch) => {
		dispatch(fecthOrdersStart());

		axios
			.get('/orders.json')
			.then((res) => {
				const fetchedOrders = [];

				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}

				dispatch(fecthOrdersSuccess(fetchedOrders));
			})
			.catch((error) => {
				dispatch(fecthOrdersFail(error));
			});
	};
};
