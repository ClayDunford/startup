import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';

export function Gallery() {
  const [succulents, setSucculents] = useState([]);

  useEffect(() => {
    const myData = JSON.parse(localStorage.getItem('succulentData'));

    const fakeSucculents = generateFakeSucculents(8);

    if (myData) {
      fakeSucculents.unshift({
        username: 'You',
        ...myData,
      });
    }
    setSucculents(fakeSucculents);
  }, []);


  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style={{ backgroundColor: "#006838" }}>
          <h1> Global Succulent Gallery: (Dataframe/Websocket)</h1>
        </div>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {succulents.map((s, i) => (
            <div key={i} className="card bg-dark text-light" style={{ width: "18rem" }}>
              <img className="card-img-top" src="/WindowTest.svg" alt="Temp Image" />
              <div className="card-body">
                <h5 className="card-title">{s.username}'s Succulent</h5>
                <p className="card-text mb-1"><strong>Size:</strong>{s.savedSize}</p>
                <p className="card-text mb-1"><strong>Water:</strong>{s.savedWater}</p>
                <p className="card-text mb-1"><strong>Pot Color:</strong>{s.savedPotColor}</p>
                <p className="card-text small text-muted">
                  Last updated: {new Date(s.savedDate).toLocaleDateString()}
                </p>

                {/* <NavLink to="/" className="btn btn-success">View Succulent</NavLink> */}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function generateFakeSucculents(count = 5) {
  const fakeNames = ['Luna', 'Kai', 'Sage', 'Milo', 'Rowan', 'Ivy', 'Theo', 'Nova', 'Aria', 'Finn'];
  return Array.from({length:count}, () =>generateFakeSucculent(fakeNames));
}

function generateFakeSucculent(names) {
  const username = names[Math.floor(Math.random() * names.length)];
  const potColors = ['red', 'green', 'blue', 'yellow', 'pink', 'terracotta', 'white'];

  return ({
    username,
    savedSize:(Math.random() * 10 + 1).toFixed(1),
    savedWater: Math.floor(Math.random() * 100) + 20,
    savedDate: new Date().toISOString(),
    savedPotColor: potColors[Math.floor(Math.random() * potColors.length)],
  });
}