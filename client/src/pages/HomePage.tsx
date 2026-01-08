import { useNavigate } from 'react-router-dom';

function HomePage() {
    // setup navigation
    const navigate = useNavigate();
    // Navigation to other pages
    const handleLoginClick = (): void => {
        navigate('/login');
    };
    const handleSignUpClick = (): void => {
        navigate('/');
    };

    return (
        <div>
            <h1>FundTracker</h1>
            <div>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleSignUpClick}>Sign-Up</button>
            </div>
        </div>
    );
}

export default HomePage;