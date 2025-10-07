import React from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';

export function Gallery() {
  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor: "#006838" }}>
          <h1> Global Succulent Gallery: (Dataframe/Websocket)</h1>
        </div>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          <div className="card bg-dark text-light" style= {{ width: "18rem" }}>
            <img className="card-img-top" src="/WindowTest.svg" alt="Temp Image" />
            <div className="card-body">
              <h5 className="card-title">[Username]'s Succulent</h5>
              <NavLink to="/" className="btn btn-success">View Succulent</NavLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}