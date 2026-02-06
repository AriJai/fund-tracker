import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { logoutUser } from "../../redux/auth/authActions";
import { getBalance } from "../../redux/transactions/transactionsActions";
import styles from "./DashboardPage.module.scss";
import { useEffect } from "react";

function DashboardPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    let balance = useSelector((state: RootState) => state.transactions.balance)

    useEffect(() => {
        if (user) {
            const userId: string = user?.id;
            dispatch(getBalance(userId));
        }
    }, []);


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
        <div className={styles.contianer}>
            <h1>Dashboard</h1>
            <h2>Welcome, {user?.username}!</h2>
            <div>
                <p>Current Funds: ${balance}</p>
            </div>
            <button onClick={handleLogOut}>Log-out</button>
        </div>
    );
}

export default DashboardPage;