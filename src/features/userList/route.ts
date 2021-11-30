import { lazy } from 'react';
import { RouteType } from 'src/core/types/route';

const UserList = lazy(() => import('.'));

const userListRoute: RouteType = {
	path: '/userList',
	component: UserList,
	private: true,
};

export default userListRoute;
