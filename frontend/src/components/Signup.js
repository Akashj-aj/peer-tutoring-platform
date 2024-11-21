import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '', general: '' }); // Error state
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};

        if (!username) newErrors.username = 'Username is required.';
        else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters long.';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) newErrors.email = 'Email is required.';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password) {
        newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!passwordRegex.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors before validation
        setErrors({ username: '', email: '', general: '' });

        if (!validateInputs()) {
            return; // Stop submission if validation fails
        }

        try {
            await registerUser({ username, email, password });
            navigate('/login'); // Redirect to login page on success
        } catch (error) {
            if (error.response) {
                // Reset specific errors before setting new ones
                const errorData = error.response.data.error;
                const newErrors = { username: '', email: '', general: '' };

                if (errorData.includes('username')) {
                    newErrors.username = 'Username already exists.';
                }
                if (errorData.includes('email')) {
                    newErrors.email = 'Email already exists.';
                }
                if (!newErrors.username && !newErrors.email) {
                    newErrors.general = 'An unexpected error occurred. Please try again.';
                }

                setErrors(newErrors);
            } else {
                setErrors({ username: '', email: '', general: 'Network error. Please check your connection.' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            </div>

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

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
