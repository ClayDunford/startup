import React from 'react';

export function About() {
  return (
    <div className="d-flex flex-column bg-custom min-vh-100">
      <main>
        <div className="text-light text-center" style= {{ backgroundColor:'#006838' }}>
          <h1> About this Site:</h1>
        </div>
        <p className="text-center ms-10 me-10">Simple Succulents is a student project built as a realtime succulent and window simulator. The succulent
          you
          plant grows in realtime, so check back in a few months to see how much its grown!
        </p>
      </main>
    </div>
  );
}