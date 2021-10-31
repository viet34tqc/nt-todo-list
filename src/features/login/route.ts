import { lazy } from 'react';
import { RouteType } from 'src/types/route';
const Login = lazy(() => import('./Login'));

const loginRoute: RouteType = {
	path: '/login',
	component: Login,
};

export default loginRoute;
