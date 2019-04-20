import MainPage from 'pages/MainPage';

export interface appRoute {
  name: string;
  path: string;
  component: React.ComponentType;
}

const routes: appRoute[] = [{
    name: 'Capture the Block',
    path: '/',
    component: MainPage
  }
];

export default routes;
