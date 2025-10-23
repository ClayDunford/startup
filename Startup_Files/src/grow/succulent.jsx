import React from 'react';

export default function Succulent({ size, potColor }) {
    return (
        <div
            style={{
                position: 'relative',
                width: 120,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 792 432"
                width={120}
                height={120}
                style={{
                    zIndex: 2,
                }}
            >
                {/* Pot*/}
                <path
                    d="M576.33,695.17H215.67c-14.68,0-27.45-10.06-30.89-24.33L81.2,240.8c-4.81-19.98,10.33-39.21,30.89-39.21h567.83c20.55,0,35.7,19.22,30.89,39.21l-103.58,430.03c-3.44,14.27-16.21,24.33-30.89,24.33Z"
                    fill={potColor}
                />
                <rect
                    x="18.62"
                    y="116.93"
                    width="754.76"
                    height="126.09"
                    rx="20.27"
                    ry="20.27"
                    fill={potColor}
                />
            </svg>
            <img src="/Succulentplant.svg"
                alt="Succulent"
                style={{ 
                    transform: `scale(${size})`,
                    transition: 'transform 1s ease', 
                    transformOrigin: 'bottom center',
                    position: 'absolute',
                    bottom: 60,
                    zIndex: 1,
                    }} />

        </div>
    )
}