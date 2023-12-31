import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import CalendarPage from './pages/CalendarPage'
import MyPage from './pages/MyPage';
import ProfilePage from './pages/ProfilePage';
import FilmoPage from './pages/FilmoPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'map', element: <MapPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'myPage', element: <MyPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'filmo', element: <FilmoPage /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
      children: [
        { element: <Navigate to="/login/google" />, index: true },
        { path: 'google', element: <LoginPage /> },
        { path: 'kakao', element: <LoginPage /> },
        { path: 'naver', element: <LoginPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
