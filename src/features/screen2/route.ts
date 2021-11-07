import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';

const Screen2 = lazy(() => import('.'));

const screen2Route: RouteType = {
	path: '/screen2',
	component: Screen2,
};

export default screen2Route;
