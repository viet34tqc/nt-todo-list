import { lazy } from 'react';
import { RouteType } from 'src/types/route';
const NotFound = lazy(() => import('./NotFound'));

const notFoundRoute: RouteType = {
	path: '*',
	component: NotFound,
};

export default notFoundRoute;
