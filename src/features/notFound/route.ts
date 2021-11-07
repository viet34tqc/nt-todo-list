import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';
const NotFound = lazy(() => import('.'));

const notFoundRoute: RouteType = {
	path: '*',
	component: NotFound,
};

export default notFoundRoute;
