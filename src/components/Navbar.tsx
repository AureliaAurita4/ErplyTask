import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearUser } from '../store/actions';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.user.token !== '');

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/');
      };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News Portal
                </Typography>
            {isAuthenticated && <Button color="inherit" onClick={ handleLogout }>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;