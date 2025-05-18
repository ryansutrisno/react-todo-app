import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodosPage from '../pages/TodosPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><TodosPage /></ProtectedRoute>
            },
            {
                path: '/login',
                element: <PublicRoute><LoginPage /></PublicRoute>
            },
            {
                path: '/register',
                element: <PublicRoute><RegisterPage /></PublicRoute>
            }
        ]
    }
]);