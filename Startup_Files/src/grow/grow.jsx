import React from 'react';
import '../app.css';

export function Grow() {
  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor: '#006838'}} >
          <h1>Placeholder for Web App (will incorporate 3rd party api into the app)</h1>
        </div>
        <img src="/WindowTest.svg" alt="Temp image for the web application" />
      </main>
    </div>
  );
}