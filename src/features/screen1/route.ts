import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';

const Screen1 = lazy(() => import('.'));

const screen1Route: RouteType = {
	path: '/',
	component: Screen1,
	exact: true,
};

export default screen1Route;
