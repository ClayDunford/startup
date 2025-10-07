import React from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';
export function Createaccount() {
  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor:"#006838" }}>
          <h1> Create an Account:</h1>
        </div>
        <div className="card mx-auto bg-dark text-light" style= {{width: "30rem" }}>
          <form className="px-4 py-3">
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">Username</label>
              <input type="text" className="form-control" id="Username" name="Username" placeholder="Username"/>
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password</label>
              <input type="password" className="form-control" id="Password" name="Password" placeholder="Password"/>
            </div>
            <div className="mb-3">
              <label htmlFor="PasswordConfirm" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="PasswordConfirm" name="PasswordConfirm" placeholder="Password"/>
            </div>
            <div className="d-grid gap-2">
              <NavLink to="/grow" className="btn btn-success">Create Account</NavLink>
              <NavLink to="/login" className="btn btn-outline-success">Already have an account? Click here to log in!</NavLink>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}