import { RouteType } from 'src/core/types/route';
import loginRoute from 'src/features/login/route';
import notFoundRoute from 'src/features/notFound/route';
import profileFormRoute from 'src/features/profile/route';
import screen1Route from 'src/features/screen1/route';
import screen2Route from 'src/features/screen2/route';
import userListRoute from 'src/features/userList/route';

const routes: RouteType[] = [
	profileFormRoute,
	screen1Route,
	screen2Route,
	loginRoute,
	userListRoute,
	notFoundRoute,
];

export default routes;
