import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import authApi from 'src/features/login/authApi';
import AuthenticationService from '../authenticationService';

axios.defaults.headers.get['Accept'] = 'application/json'; // default header for all GET request
axios.defaults.headers.post['Accept'] = 'application/json'; // default header for all POST request

const axiosTodoClient = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/todos/',
});

axiosTodoClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosTodoClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error);
	}
);

const axiosAuthClient = axios.create({
	baseURL: 'https://nestapisd.herokuapp.com/',
});
const authentication = AuthenticationService.getInstance();
const expiredToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzMSI6IkhvYWkgZHVjIiwiYWRkcmVzczIiOiJIb2FpIGR1YyIsImFncmVlbWVudCI6dHJ1ZSwiYmlydGhkYXkiOiIxOTk5LTEwLTAxVDAwOjAwOjAwLjAwMFoiLCJjaXR5IjoiSGEgbm9pIiwiY29tcGFueSI6Ik5hc2h0ZWNoIiwiY291bnRyeSI6IkhhIE5vaSIsImVtYWlsIjoidXNlcjAwMkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJRdcOibiIsImdlbmRlciI6Im1hbGUiLCJsYXN0bmFtZSI6IlBoYW4iLCJwaG9uZSI6IjA5ODg3MTU0MzYiLCJwb3N0Y29kZSI6IjEwMDAwMCIsInJlZ2lvbnN0YXRlIjoiVmlldCBuYW0iLCJpYXQiOjE2MzQyNzE1OTUsImV4cCI6MTYzNDI3NTE5NX0.wk5p7w-JS9PFVZmJ-U7MtqfiE_od43sFgzqPhPgoJlk';
axiosAuthClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		// The use of expired token here is just for demo.
		const token = config.params?.isExpiredToken
			? expiredToken
			: authentication.getToken().token;
		if (config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
axiosAuthClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response.data;
	},
	async function (error) {
		const originalRequest = error.config;

		// set _retry to true to prevent infinite loop if the request for refresh token return 401 again
		// https://www.bezkoder.com/axios-interceptors-refresh-token/
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const tokens = await authApi.getRefreshToken({
				refreshToken: authentication.getToken().refreshToken,
				email: 'user002@gmail.com',
			});
			authentication.authenticated(tokens);
			// Reset the params. Otherwise, the request keeps sending the request with isExpiredToken params
			originalRequest.params = {};
			return axiosAuthClient(originalRequest);
		}
		return Promise.reject(error);
	}
);
export { axiosTodoClient, axiosAuthClient };
