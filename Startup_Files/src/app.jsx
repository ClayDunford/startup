import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './login/login';
import { About } from './about/about';
import { Grow } from './grow/grow';
import { Homepage } from './homepage/homepage';
import { Createaccount } from './createaccount/createaccount';
import { Gallery } from './gallery/gallery';

if (import.meta.env.MODE === 'development') {
    localStorage.removeItem('succulentData'); // or localStorage.clear();
}

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const item = localStorage.getItem('currentUser');

    // Only try parsing if something exists
    if (item) {
        try {
            const stored = JSON.parse(item);

            // Ensure it’s actually an object before setting
            if (stored && typeof stored === 'object') {
                setUser(stored);
            } else {
                // Clear invalid value
                console.warn('currentUser in localStorage is not an object, clearing.');
                localStorage.removeItem('currentUser');
            }
        } catch (err) {
            console.warn('Failed to parse currentUser from localStorage:', err);
            localStorage.removeItem('currentUser'); // remove corrupted value
        }
    }
}, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);
                return true;
            } else {
                alert('Invalid username or password');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login');
            return false;
        }
    };

    const handleCreateAccount = async (username, password) => {
    try {
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        // Get raw text instead of JSON first
        const text = await response.text();
        console.log('Server raw response:', text);

        // Now try parsing
        let user;
        try {
            user = JSON.parse(text);
        } catch (err) {
            console.error('Failed to parse JSON from server:', err);
            return false;
        }

        setUser(user);
        return true;

    } catch (error) {
        console.error('Create account error:', error);
        return false;
    }
};


    const handleLogout = async () => {
    try {
        await fetch('/api/auth/logout', {
            method: 'DELETE',
            credentials: 'include' 
        });
        setUser(null);
    } catch (error) {
        console.error('Logout error:', error);
    }
};

    function ProtectedRoute({ user, children }) {
        if (!user) {
            alert("You must be logged in to access this page.");
            return <Navigate to="/login" replace />;
        }
        return children;
    }

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light d-flex flex-column min-vh-100">
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/">
                                <img src="/SimpleSucculentLogo.svg" alt="Simply Succulents Logo" height="60" />
                                Simply Succulents
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems"
                                aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarItems">
                                <ul className="navbar-nav align-items-end flex-md-row mx-md-auto text-md-center">
                                    <li className="nav-item"><NavLink className='nav-link' to='/'>Home</NavLink></li>
                                    <li className="nav-item"><NavLink className='nav-link' to='grow'>Grow</NavLink></li>
                                    <li className="nav-item"><NavLink className='nav-link' to='gallery'>Gallery</NavLink></li>
                                    <li className="nav-item"><NavLink className='nav-link' to='about'>About</NavLink></li>
                                </ul>
                                <div className="d-flex gap-2 mt-2 ms-auto flex-column flex-md-row align-items-end">
                                    {user ? (
                                        <>
                                            <span className="text-light me-2">Welcome, {user.username}!</span>
                                            <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>

                                        </>
                                    ) : (
                                        <>
                                            <NavLink to='login' className="btn btn-success">Log in</NavLink>
                                            <NavLink to='createaccount' className="btn btn-outline-success">Create Account</NavLink>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/grow' element={<ProtectedRoute user={user}><Grow /></ProtectedRoute>} />
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login onLogin={handleLogin} />} />
                    <Route path='/createaccount' element={<Createaccount onCreateAccount={handleCreateAccount} />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer className="bg-dark text-light text-center py-3 mt-auto">
                    <ul className="navbar-nav d-flex flex-md-row flex-column mb-0 justify-content-center align-items-center">
                        <li className="nav-item mx-2">
                            <span>Clay Dunford</span>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="https://github.com/ClayDunford/startup">GitHub</a>
                        </li>
                    </ul>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}