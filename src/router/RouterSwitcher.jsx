import React from 'react';
import { Route,Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import AdminPage from '../pages/AdminPage';
import CalculatorPage from '../pages/CalculatorPage';

const RouteSwitcher = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/admin-page" element={<AdminPage />} />
        </Routes>
    );
};

export default RouteSwitcher;