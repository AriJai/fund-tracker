import { useNavigate } from 'react-router-dom';

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
            <form className="login-form">
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
            <button onClick={handleHomePageClick}>Go Back</button>
        </div>
    );
}

export default LoginPage;