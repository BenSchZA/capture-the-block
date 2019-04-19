import DashboardContainer from 'containers/DashboardContainer';

export interface appRoute {
  name: string;
  path: string;
  component: React.ComponentType;
  isProtected: boolean;
  isNavRequired: boolean;
}

const routes: appRoute[] = [{
    name: 'Dashboard',
    path: '/dashboard',
    component: DashboardContainer,
    isProtected: true,
    isNavRequired: true,
  }
];

export default routes;
