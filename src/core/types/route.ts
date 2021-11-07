export interface RouteType {
	path: string;
	private?: boolean;
	component: React.ComponentType | React.LazyExoticComponent<() => JSX.Element>;
	exact?: boolean;
}
