export interface LoginResponse {
	refreshToken: string;
	token: string;
	expiredIn: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface RefreshTokenParams {
	refreshToken: string;
	email: string;
}
