// client/src/components/Login.tsx
import React, { useState } from 'react';

const Login: React.FC = ()=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for submitting the login form
        console.log('Login submitted:', { username, password });
    };

    return (
        <div className='contained py-5'>
            <h2>Log In
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input
                            type='text'
                            className='form-control'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-primary' type='submit'>Log In</button>
                </form>
            </h2>
        </div>
    );
};

export default Login;