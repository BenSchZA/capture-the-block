import CaptureTheBlockContainer from 'containers/CaptureTheBlockContainer';

export interface appRoute {
  name: string;
  path: string;
  component: React.ComponentType;
}

const routes: appRoute[] = [{
    name: 'Capture the Block',
    path: '/',
    component: CaptureTheBlockContainer
  }
];

export default routes;
