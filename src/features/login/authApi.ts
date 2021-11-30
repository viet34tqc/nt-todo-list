import { axiosAuthClient } from 'src/core/api/axiosClient';
import { LoginParams, LoginResponse, RefreshTokenParams } from './auth';

const authApi = {
	login(params: LoginParams): Promise<LoginResponse> {
		const url = '/user/login';
		return axiosAuthClient.post(url, params);
	},
	getRefreshToken(params: RefreshTokenParams): Promise<any> {
		const url = '/user/refreshToken';
		return axiosAuthClient.post(url, params);
	},
	// `params` is used for passing isExpiredToken. It is used for demo purpose only.
	getUserList(params?: {}): Promise<any> {
		console.log('params', params)
		const url = '/user/listUser';
		return axiosAuthClient.get(url, { params });
	},
};

export default authApi;
