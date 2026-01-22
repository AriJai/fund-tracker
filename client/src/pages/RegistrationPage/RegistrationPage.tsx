import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';
import styles from './RegistrationPage.module.scss';
import { registerUser } from '../../redux/auth/authActions';

function RegistrationPage() {
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
            await dispatch(registerUser(username, password));
            alert('Registration successful!');
        } catch (err) {
            alert('Registration failed.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form className={styles.registrationForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"
                    required
                    minLength={5}
                    pattern='[a-zA-Z0-9._\-]{5,}'
                    title='Username must be at least 5 characters, containing only letters, numbers, dots, hyphens, and underscores.'
                />
                <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    pattern='(?=.*[A-Za-z])(?=.*\d)(?=.*[_!@#$\-]).{8,20}'
                    title='Password must be between 8 and 20 characters, containing at least one letter, number, and special character: [!, @, #, $, %, ., _, -].'
                />
                <input
                    type="submit"
                    value="Sign Up"
                />
            </form>
            <button onClick={handleHomePageClick}>Go Back</button>
        </div>
    );
}

export default RegistrationPage;