import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';
import styles from './LoginPage.module.scss';
import { loginUser } from '../../redux/auth/authActions';

function LoginPage() {
    // User data from forms
    type UserFormState = {
        username: string;
        password: string;
    };
    const [user, setUser] = useState<UserFormState>({
        username: "",
        password: "",
    });

    // Dispatch for store
    const dispatch = useDispatch<AppDispatch>();

    // setup navigation
    const navigate = useNavigate();
    // Navigation to other pages
    const handleHomePageClick = (): void => {
        navigate('/');
    };

    // Form information
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = user.username;
        const password = user.password;

        try {
            await dispatch(loginUser(username, password));
            alert('Login successful!');
        } catch (err) {
            alert('Login failed.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                />
                <input
                    type="submit"
                    value="Log In"
                />
            </form>
            <button onClick={handleHomePageClick}>Go Back</button>
        </div>
    );
}

export default LoginPage;