import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ListApplicantPage } from './pages/applicants/list';

const routes: RouteObject[] = [
  {
    path: '/',
    // element: <App />,
    children: [
      { index: true, element: <ListApplicantPage /> },
      // { path: 'about', element: <AboutPage /> },
      // { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
