import { rest } from 'msw';
import { LoginParams } from '../auth';

const authResponse = {
	token: 'test_token',
	refreshToken: 'test_refreshtoken',
	expiredAt: '1h',
};

export const loginHandlers = [
	rest.post<LoginParams>(
		'https://nestapisd.herokuapp.com/user/login',
		(req, res, ctx) => {
			return res(ctx.json(authResponse));
		}
	),
	rest.post<LoginParams>(
		'https://nestapisd.herokuapp.com/user/refreshToken',
		(req, res, ctx) => {
			return res(ctx.json(authResponse));
		}
	),
	rest.get<any>(
		'https://nestapisd.herokuapp.com/user/listUser',
		(req, res, ctx) => {
			return res(
				ctx.json([
					{
						uid: '00fa69aa-cb87-8d5c-9bc6-f406c6c9c355',
						firstname: 'Viet',
						lastname: 'Nguyen',
					},
				])
			);
		}
	),
];
