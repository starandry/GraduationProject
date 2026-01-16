import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AuthGuardProps = {
    isAuthenticated: boolean;
};

export const RequireAuth: React.FC<AuthGuardProps> = ({ isAuthenticated }) =>
    isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;

export const RequireGuest: React.FC<AuthGuardProps> = ({ isAuthenticated }) =>
    !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
