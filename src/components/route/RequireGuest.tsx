import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const RequireGuest: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default RequireGuest;
