import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.scss';

function RegistrationPage() {
    // setup navigation
    const navigate = useNavigate();
    // Navigation to other pages
    const handleHomePageClick = (): void => {
        navigate('/');
    };

    return (
        <div>
            <h1>Register</h1>
            <form className={styles.registrationForm}>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <input type="submit" value="Sign Up" />
            </form>
            <button onClick={handleHomePageClick}>Go Back</button>
        </div>
    );
}

export default RegistrationPage;