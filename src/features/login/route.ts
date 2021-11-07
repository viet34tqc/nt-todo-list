import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';
const Login = lazy(() => import('.'));

const loginRoute: RouteType = {
	path: '/login',
	component: Login,
};

export default loginRoute;
