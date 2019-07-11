import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSucess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => dispatch(logout()), expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());

		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		const apiKey = 'AIzaSyBe-qbnZYRiyrZgmAXdpnEQGGLXvBi5D8E';
		let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;

		if (!isSignUp) {
			url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
		}

		axios
			.post(url, authData)
			.then((response) => {
				dispatch(authSucess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch((error) => {
				console.log(error.response.data.error.message);
				dispatch(authFail(error.response.data.error));
			});
	};
};
