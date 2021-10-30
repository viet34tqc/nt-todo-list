import { RouteType } from 'src/types/route';
import NotFound from './NotFound';

const notFoundRoute: RouteType = {
	path: '*',
	component: NotFound,
	exact: true,
};

export default notFoundRoute;
