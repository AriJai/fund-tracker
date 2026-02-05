import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { logoutUser } from "../../redux/auth/authActions";
import styles from "./DashboardPage.module.scss";

function DashboardPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogOut = async () => {
        try {
            await dispatch(logoutUser());
            navigate('/login', { replace: true })
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Logout failed:', err.message);
                alert('Logout failed. Please try again.');
            } else {
                console.error('Logout failed:', err);
            }
        }


    }

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Welcome, {user?.username}!</h2>
            <div>
                <p>Current Funds: </p>
            </div>
            <button onClick={handleLogOut}>Log-out</button>
        </>
    );
}

export default DashboardPage;