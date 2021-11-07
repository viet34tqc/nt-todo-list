class AuthenticationService {
	private static instance: any;

	constructor(public token?: string) {}

	authenticated(auth: any) {
		this.token = auth.token;
	}

	public static getInstance(): any {
		if (!AuthenticationService.instance) {
			AuthenticationService.instance = new AuthenticationService();
		}
		return AuthenticationService.instance;
	}
}

export default AuthenticationService;
