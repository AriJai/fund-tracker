import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

function LoginPage() {
    // setup navigation
    const navigate = useNavigate();
    // Navigation to other pages
    const handleHomePageClick = (): void => {
        navigate('/');
    };

    return (
        <div>
            <h1>Login</h1>
            <form className={styles.loginForm}>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
            <button onClick={handleHomePageClick}>Go Back</button>
        </div>
    );
}

export default LoginPage;