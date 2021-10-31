import { lazy } from 'react';
import { RouteType } from 'src/types/route';

const ProfileForm = lazy(() => import('./ProfileForm'));

const profileFormRoute: RouteType = {
	path: '/profile',
	component: ProfileForm,
	private: true,
};

export default profileFormRoute;
