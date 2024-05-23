import React, { useState } from 'react';
import { Button, TextField, Typography, Container, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setUser({ email, token }));
        navigate('/news');
    };

    return (
        <div>
            <Container>
                <Typography variant="h4" sx={{ mt: 2 }}>Log in</Typography>
                <form onSubmit={ handleSubmit }>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField id="email" value={ email } onChange={(e) => setEmail(e.target.value)} sx={{ mt: 2, mr: 2, mb: 2 }} required />
                    <InputLabel htmlFor="apiToken">API Token</InputLabel>
                    <TextField id="apiToken" value={ token } onChange={(e) => setToken(e.target.value)} sx={{ mt: 2, mb: 2 }} required /><br />
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form><br />
                <Typography variant="body1">
                    Get an API token <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer">here</a>.
                </Typography>
            </Container>
        </div>
    );
};

export default LoginPage;
