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
    const [error, setError] = useState<string | null>(null);

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
        // ToDo: Update alert() for better user experience
        try {
            await dispatch(loginUser( user.username, user.password ));
            navigate('/dashboard')
        } catch (err) {
            setError('Login failed. Please check your credentials.');
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
                {error && <div className="error-message">{error}</div>}
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