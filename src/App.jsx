import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [income, setIncome] = useState(30000);
    const [savings, setSavings] = useState(5000);
    const [needs, setNeeds] = useState(17000);
    const [extras, setExtras] = useState(3000);

    useEffect(() => {
        // Check local storage for login status on component mount
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple authentication (replace with your actual authentication logic)
        // Default credentials: user@example.com / password123
        if (email === 'user@example.com' && password === 'password123') {
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    //Budget
    const totalExpenses = needs + extras;
    const totalIncome = income;
    const totalSavings = savings;
    const netTotal = totalIncome - totalExpenses - totalSavings;

    const clearAllFields = () => {
        setEmail('');
        setPassword('');
        setIncome(0);
        setSavings(0);
        setNeeds(0);
        setExtras(0);
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-image">
                    {/* Replace with your calculator/money icon image */}
                    <img src="./calculator-money.png" alt="Calculator Icon" width="200" />
                </div>
                <div className="login-form">
                    <h1>Monthly Budget Planner</h1>
                    <p>Please enter your details</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#">Forgot Password?</a>
                        <button type="submit" className="login-button">Log In</button>
                        <button className="login-button google-login">Log In with Google</button>
                    </form>
                    <p>Don't have an account? <a href="#">Sign Up</a></p>
                </div>
            </div>
        );
    } else {
        // Budget Planner Content
        return (
            <div className="container">
                <div className="header">
                    <h1>Budget Planner</h1>
                </div>
                <div className="content">
                    <div className="budget-overview">
                        <h2>Monthly Budget Overview</h2>
                        <div className="section">
                            <h3>Income</h3>
                            <div className="input-row">
                                <label>salary</label>
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(parseFloat(e.target.value))}
                                />
                                <button className="add-row-button">Add Row</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Savings</h3>
                            <div className="input-row">
                                <label>savings</label>
                                <input
                                    type="number"
                                    value={savings}
                                    onChange={(e) => setSavings(parseFloat(e.target.value))}
                                />
                                <button className="add-row-button">Add Row</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Fixed Expenses</h3>
                            <div className="input-row">
                                <label>Needs</label>
                                <input
                                    type="number"
                                    value={needs}
                                    onChange={(e) => setNeeds(parseFloat(e.target.value))}
                                />
                                <button className="add-row-button">Add Row</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Variable Expenses</h3>
                            <div className="input-row">
                                <label>Extras</label>
                                <input
                                    type="number"
                                    value={extras}
                                    onChange={(e) => setExtras(parseFloat(e.target.value))}
                                />
                                <button className="add-row-button">Add Row</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="section">
                            <h3>Other Expenses</h3>
                            <div className="input-row">
                                <label>Other</label>
                                <input type="number" />
                                <button className="add-row-button">Add Row</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="summary">
                        <h2>Summary</h2>
                        <p>Total Income: {totalIncome}</p>
                        <p>Total expenses: {totalExpenses}</p>
                        <p>Total savings: {totalSavings}</p>
                        <div className="net-total">
                            {netTotal}
                            <p>{netTotal >= 0 ? 'POSITIVE NET TOTAL' : 'NEGATIVE NET TOTAL'}</p>
                        </div>
                        <button onClick={clearAllFields}>Clear All Fields</button>
                    </div>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }
}

export default App;