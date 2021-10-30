import notFoundRoute from 'src/features/notFound/route';
import profileFormRoute from 'src/features/profile/route';
import screen1Route from 'src/features/screen1/route';
import screen2Route from 'src/features/screen2/route';
import { RouteType } from 'src/types/route';

const routes: RouteType[] = [
	profileFormRoute,
	screen1Route,
	screen2Route,
	notFoundRoute,
];

export default routes;
