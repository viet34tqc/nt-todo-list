import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.headers.get['Accept'] = 'application/json'; // default header for all GET request
axios.defaults.headers.post['Accept'] = 'application/json'; // default header for all POST request

const axiosTodoClient = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/todos/',
});

// Add a request interceptor
axiosTodoClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosTodoClient.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export {axiosTodoClient};
