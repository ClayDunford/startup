import React from 'react';

export default function Succulent({ size, potColor }) {
    return (
        <div
            style={{
                transform: `scale(${size})`,
                transition: 'transform 1s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
             <img src="/Succulentplant.svg" alt="Succulent" width="50" />
        <div
            style={{
                width: '120px',
                height: '40px',
                backgroundColor: potColor,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                marginTop: '-10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, .3)',
            }}
            />
        </div>
    )   
}