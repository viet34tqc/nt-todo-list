class AuthenticationService {
	private static instance: any;

	constructor(public token?: string, public refreshToken?: string) {}

	authenticated(auth: any) {
		this.token = auth.token;
		this.refreshToken = auth.refreshToken;

		localStorage.setItem('token', this.token as string);
		localStorage.setItem('refreshToken', this.refreshToken as string);
	}

	public getToken() {
		return {
			token: this.token || localStorage.getItem('token'),
			refreshToken: this.refreshToken || localStorage.getItem('refreshToken'),
		}
	}

	public static getInstance(): any {
		if (!AuthenticationService.instance) {
			AuthenticationService.instance = new AuthenticationService();
		}
		return AuthenticationService.instance;
	}
}

export default AuthenticationService;
