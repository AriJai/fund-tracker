import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import type { KeyboardEvent } from "react";
import { logoutUser } from "../../redux/auth/authActions";
import { addFunds, getBalance } from "../../redux/transactions/transactionsActions";
import styles from "./DashboardPage.module.scss";
import { useEffect, useRef, useState } from "react";
import type { AddFundsFormProps, AddFundsFormState, AddFundsPayload } from "../../redux/transactions/transactionsTypes";

function DashboardPage() {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const balance = useSelector((state: RootState) => state.transactions.balance);
    const loading = useSelector((state: RootState) => state.transactions.loading);
    const error = useSelector((state: RootState) => state.transactions.error);
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Gather User's current balance
    useEffect(() => {
        if (user) {
            const userId: string = user?.id;
            dispatch(getBalance(userId));
        }
    }, [user]);

    // Form State for addFunds
    const [formError, setFormError] = useState<string | null>(null);
    const [amountError, setAmountError] = useState<string | null>(null);
    const [fundAsInteger, setFundAsInteger] = useState<string>("000");
    const [transaction, setTransaction] = useState<AddFundsFormState>({
        targetType: "user",
        targetId: Number(user?.id),
        amount: fundAsInteger,
        reason: "",
    });

    // Helper Functions to check amount value in form
    // Format string to currency in form
    const formatValue = (value: string): string => {
        const intVal = parseInt(value, 10);
        const dollars = Math.floor(intVal / 100);
        const cents = intVal % 100;

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(dollars + cents / 100);
    };
    const setCursorToEnd = (): void => {
        if (!inputRef.current) return;
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
    };
    useEffect(() => {
        setCursorToEnd();
    }, [fundAsInteger]);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const key = e.key;

        // Handle special keys: Enter, Escape, Tab
        if (["Enter", "Escape", "Tab"].includes(key)) {
            e.preventDefault();
            e.currentTarget.blur();
            setAmountError(null);
            return;
        }

        // Allow only digits and Backspace
        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
            setAmountError("Only numeric keys are allowed");
            return;
        } else {
            setAmountError(null);
        }

        e.preventDefault();

        // Work with the current value
        let updated = fundAsInteger;

        if (key === "Backspace") {
            updated = updated.length === 3 ? "0" + updated.slice(0, -1) : updated.slice(0, -1);
        } else {
            // Prevent exceeding maximum value (99,999.99 stored as 7-digit integer)
            if (updated.length === 7) {
                setAmountError("Funds must not exceed $99,999.99");
                return;
            }

            // Remove leading zero if exists
            updated = updated[0] === "0" ? updated.slice(1) + key : updated + key;
        }

        // Update state
        setFundAsInteger(updated);
        setTransaction(prev => ({
            ...prev,
            amount: updated,
        }));
    };

    // Helper functions to clean the user memo text
    // Handles textarea changes
    const MAX_TEXT = 200;
    const textRemaining = MAX_TEXT - transaction.reason.length;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const trimmedValue = value.slice(0, MAX_TEXT);

        setTransaction(prev => ({
            ...prev,
            [name]: trimmedValue,
        }));
    };

    // Helper function to format the balance value into dollars
    const balanceToDollars = (value: number | null): string => {
        return value === null ? "0.00" : (value / 100).toFixed(2);
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAmountError(null);
        setFormError(null);

        // amount field
        const amountAsInt = parseInt(fundAsInteger, 10);

        if (isNaN(amountAsInt) || amountAsInt <= 0) {
            setAmountError("Please enter a valid amount greater than $0.00");
            return;
        }
        if (amountAsInt > 99_999_99) {
            setAmountError("Amount exceeds maximum allowed ($99,999.99)");
            return;
        }

        try {
            // Show dialog box
            dialogRef.current?.showModal();
        } catch (err) {
            setFormError('Failed to add Funds. Please try again.');
        }
    }

    // Dialog box logic
    const handleDialogClose = async (e: React.SyntheticEvent<HTMLDialogElement>) => {
        const dialog = e.currentTarget;
        const result = dialog.returnValue;

        if (result === "confirm") {
            try {
                const trimmedReason = transaction.reason.trim();
                const payload: AddFundsPayload = {
                    target_type: transaction.targetType,
                    target_id: Number(transaction.targetId),
                    amount: parseInt(transaction.amount, 10),
                    reason: trimmedReason || null,
                };
                await dispatch(addFunds(payload)).unwrap();
                dialog.close();

                // Refresh Page
                window.location.reload();

            } catch (err: unknown) {
                console.error("Adding funds failed:", err);
                setFormError("Failed to add funds. Please try again.");
            }
        } else {
            // Cancel clicked, just close dialog
            dialog.close();

        }
    };

    // Log out User, and return to the Login page.
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
        <div className={styles.container}>
            <h1>Dashboard</h1>
            <h2>Welcome, {user?.username}!</h2>
            <div>
                <p>Current Funds: ${balanceToDollars(balance)}</p>
            </div>
            <form
                className={styles.AddFundsForm}
                onSubmit={handleSubmit}
                aria-labelledby="dashboard-form"
                noValidate
            >
                <fieldset>
                    <label htmlFor='amount'>Amount: </label>
                    <input
                        id='amount'
                        type="text"
                        value={formatValue(transaction.amount)}
                        name="amount"
                        inputMode="numeric"
                        aria-label="Amount to add"
                        aria-describedby="amount-help amount-error"
                        aria-required="true"
                        aria-invalid={!!amountError}
                        pattern="[0-9]*"
                        onKeyDown={handleKeyDown}
                        required
                        autoComplete="off"
                        readOnly
                    />
                    {amountError && (
                        <small id="amount-help" role="alert" aria-live="assertive" style={{ color: 'red' }}>
                            {amountError}
                        </small>
                    )}
                    <label htmlFor="reason">Note (limit:{textRemaining}):</label>
                    <textarea
                        id='reason'
                        aria-label="Reason for adding funds. (optional)"
                        value={transaction.reason}
                        onChange={handleChange}
                        maxLength={200}
                        name='reason'
                    />
                    {formError && (
                        <p id="amount-error" role="alert" aria-live="assertive">
                            {formError}
                        </p>
                    )}
                </fieldset>
                <input
                    type="submit"
                    value='Add Funds'
                    disabled={!!amountError || loading}
                />
            </form>
            <dialog ref={dialogRef} onClose={handleDialogClose}>
                <form method="dialog">
                    <p>Confirm adding {formatValue(fundAsInteger)} to your account?</p>
                    <menu>
                        <button value="cancel">Cancel</button>
                        <button value="confirm">Confirm</button>
                    </menu>
                </form>
            </dialog>
            <button onClick={handleLogOut}>Log-out</button>
        </div>
    );
}

export default DashboardPage;