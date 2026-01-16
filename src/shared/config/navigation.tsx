import React from 'react';
import { Home, Trends, Favorites, Settings } from '../ui/Icon/icon.component';

// пункты меню
export const menuItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/trends', label: 'Trends', icon: <Trends /> },
    { path: '/favorites', label: 'Favorites', icon: <Favorites /> },
    { path: '/settings', label: 'Settings', icon: <Settings /> },
];
