import React from 'react';

export default function Controls({ potColor, setPotColor, water, setWater }) {
    return (
        <div className='mt-4 text-light text-center'>
            <div>
                <label>Pot Color:</label>
                <input
                    type="color"
                    value={potColor}
                    onChange={(e) => setPotColor(e.target.value)}
                    style={{ margeLeft: '10px' }}
                />
            </div>
            <div className="mt-3">
                <label>Water: {water}</label>
                <input 
                    type="range"
                    min="0"
                    max="10"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    />
            </div>
        </div>
    )
}