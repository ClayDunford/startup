import React from 'react';
import { useGalleryWebSocket } from './useGalleryWebSocket';
import '../app.css';

export function Gallery() {
  const succulents = useGalleryWebSocket();

  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor: "#006838" }}>
          <h1>Global Succulent Gallery (Live Updates)</h1>
        </div>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {succulents.length === 0 ? (<p className="text-light"> No succulents in the gallery yet. Start growing yours!</p>) :
            (succulents.map((s, i) => (
              <div key={s.id || i} className="card bg-dark text-light" style={{ width: "18rem" }}>
                <img className="card-img-top" src="/WindowTest.svg" alt="Succulent" />
                <div className="card-body">
                  <h5 className="card-title">{s.username}'s Succulent</h5>
                  <p className="card-text mb-1">Size: {s.savedSize}</p>
                  <p className="card-text mb-1">Water: {s.savedWater}</p>
                  <p className="card-text mb-1">Pot Color: {s.savedPotColor}</p>
                  <p className="card-text small text-muted">Last Updated: {new Date(s.savedDate).toLocaleString()}</p>
                </div>
              </div>
            ))
            )}
        </div>
      </main>
    </div>
  );
}