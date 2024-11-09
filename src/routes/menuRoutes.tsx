import React from 'react';
import { Home, Trends, Favorites, Settings } from '../components/UI/Icon/icon.component.tsx';
import { MovieGallery } from '../components';

// пункты меню
export const menuItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/trends', label: 'Trends', icon: <Trends /> },
    { path: '/favorites', label: 'Favorites', icon: <Favorites /> },
    { path: '/settings', label: 'Settings', icon: <Settings /> },
];

// маршруты
export const routes = [
    { path: '/', element: <MovieGallery /> },
    /*{ path: '/trends', element: <MovieGallery /> },*/
];
