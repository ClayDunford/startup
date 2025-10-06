import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light d-flex flex-column min-vh-100">
    <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="index.html">
                    <img src="/SimpleSucculentLogo.svg" alt="Simply Succulents Logo" height="60"/>
                    Simply Succulents
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems"
                    aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarItems">
                    <ul className="navbar-nav align-items-end flex-md-row mx-md-auto text-md-center">
                        <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="grow.html">Grow</a></li>
                        <li className="nav-item"><a className="nav-link" href="gallery.html">Gallery</a></li>
                        <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                    </ul>
                    <div className="d-flex gap-2 mt-2 ms-auto flex-column flex-md-row align-items-end">
                        <a href="login.html" className="btn btn-success">Log in </a>
                        <a href="createaccount.html" className="btn btn-outline-success">Create Account </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main>App components go here</main>
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
  </div>;
}