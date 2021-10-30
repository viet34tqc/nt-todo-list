export interface RouteType {
	path: string;
	component: React.ComponentType | React.LazyExoticComponent<() => JSX.Element>;
	exact?: boolean;
}
