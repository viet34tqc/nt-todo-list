import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';

const ProfileForm = lazy(() => import('.'));

const profileFormRoute: RouteType = {
	path: '/profile',
	component: ProfileForm,
	private: true,
};

export default profileFormRoute;
