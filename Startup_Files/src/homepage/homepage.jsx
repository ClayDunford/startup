import React from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';
export function Homepage() {
    return (
        <div className="d-flex flex-column bg-custom min-vh-100">
            <main className="flex-fill container my-5">
                <div className="container position-relative text-center">
                    <img className="img-fluid w-100" src="/WindowTest.svg" alt="TempImage" />
                    <div className="transbox position-absolute top-50 start-50 d-flex 
            flex-column justify-content-center align-items-center">
                        <h1>Check Out Simply Succulents!</h1>
                        <NavLink className='nav-link' to='/grow'><button type="button" className="btn btn-success buttonPos">Start Growing!</button></NavLink>
                    </div>

                </div>
            </main>
        </div>
    );
}