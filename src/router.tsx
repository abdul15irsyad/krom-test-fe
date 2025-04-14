import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ListApplicantPage } from './pages/applicants/list';
import { NotFoundPage } from './pages/notfound';
import { DetailApplicationPage } from './pages/applicants/detail';
import { AddApplicantPage } from './pages/applicants/add';

const routes: RouteObject[] = [
  {
    path: '/',
    // element: <App />,
    children: [
      { index: true, element: <ListApplicantPage /> },
      { path: '/add', element: <AddApplicantPage /> },
      { index: false, path: '/detail/:id', element: <DetailApplicationPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
