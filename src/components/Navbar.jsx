import { AppShell, NavLink } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggle }) => {
    const navigate = useNavigate();

    return (
        <AppShell.Navbar p="md" style={{ gap: '10px' }}>
            <NavLink
                label="Calculator"
                onClick={() => {
                    navigate('/');
                    toggle();
                }}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Admin Panel"
                onClick={() => {
                    navigate('/admin-page');
                    toggle();
                }}
                style={{ margin: '5px' }}
            />
        </AppShell.Navbar>
    );
};

export default Navbar;
