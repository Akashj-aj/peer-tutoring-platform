import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Assuming loginUser is an API call function

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', general: '' }); // General error for unregistered user
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) newErrors.email = 'Email is required.';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

        if (!password) newErrors.password = 'Password is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return; // Stop submission if there are validation errors
        }

        try {
            await loginUser({ email, password });
            navigate('/home'); // Redirect to home page on success
        } catch (error) {
            // Check error response for "user not found" or "invalid credentials"
            if (error.response) {
                if (error.response.status === 404) {
                    setErrors({ email: '', password: '', general: 'User not registered. Please sign up.' });
                } else if (error.response.status === 401) {
                    setErrors({ email: '', password: 'Invalid email or password.', general: '' });
                } else {
                    setErrors({ email: '', password: '', general: 'An unexpected error occurred. Please try again.' });
                }
            } else {
                setErrors({ email: '', password: '', general: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>

            {errors.general && <span style={{ color: 'red', display: 'block', marginTop: '10px' }}>{errors.general}</span>}

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
