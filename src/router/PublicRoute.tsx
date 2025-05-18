import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;