import { lazy } from 'react';
import { RouteType } from 'src/types/route';

const Screen1 = lazy(() => import('./Screen1'));

const screen1Route: RouteType = {
	path: '/',
	component: Screen1,
	exact: true,
};

export default screen1Route;
