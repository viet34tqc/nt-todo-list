class AuthenticationService {
	private static instance: any;

	constructor(
    	public token: string = 'abc'
    ) {}
	public static getInstance(): any {
		if (!AuthenticationService.instance) {
			AuthenticationService.instance = new AuthenticationService();
		}

		return AuthenticationService.instance;
	}
}

export default AuthenticationService;
