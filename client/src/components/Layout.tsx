// client/src/components/Layout.tsx
import React, { useState } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Simulating a logged-in state for now, which we'll replace with actual session data later
    const [isLoggedIn, setIsLoggenIn] = useState(true);

    return (
        <>
            <header>
                <nav className='bg-light border navbar navbar-expand-md navbar-light'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='/'><span className='blue'>C</span><span className='red'>$</span><span className='yellow'>5</span><span className='green'>0</span> <span className='red'>Finance</span></a>
                        <button aria-controls='navbar' aria-expanded='false' aria-label='Toggle navigation' className='navbar-toggler' data-bs-target='#navbar' data-bs-toggle='collapse' type='button'>
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbar'>
                            {isLoggedIn ? (
                                <>
                                    <ul className='navbar-nav me-auto mt-2'>
                                        <li className='nav-item'><a className='nav-link' href='/quote'>Quote</a></li>
                                        <li className='nav-item'><a className='nav-link' href='/buy'>Buy</a></li>
                                        <li className='nav-item'><a className='nav-link' href='/sell'>Sell</a></li>
                                        <li className='nav-item'><a className='nav-link' href='/history'>History</a></li>
                                        <li className='nav-item'><a className='nav-link' href='/add_cash'>Add Cash</a></li>
                                    </ul>
                                    <ul className='navbar-nav ms-auto mt-2'>
                                        <li className='nav-item'><a className='nav-link' href='/change_pw'>Change Password</a></li>
                                        <li className='nav-item'><a className='nav-link' href='/logout'>Log Out</a></li>
                                    </ul>
                                </>
                            ) : (
                                <ul className='navbar-nav ms-auto mt-2'>
                                    <li className='nav-item'><a className='nav-link' href='/register'>Register</a></li>
                                    <li className='nav-item'><a className='nav-link' href='/login'>Log In</a></li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main className='contained py-5 text-center'>{children}</main>

            <footer className="mb-5">
                <p className="mb-3 small text-center text-muted">
                    Data provided by <a href="https://https://www.alphavantage.co/">Alpha Vantage</a>
                </p>
            </footer>
        </>
    );
};

export default Layout;