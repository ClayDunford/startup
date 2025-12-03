import { useEffect, useState, useRef } from 'react';

export function useGalleryWebSocket() {
    const [succulents, setSucculents] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        async function fetchInitialData() {
            try {
                const res = await fetch('/api/gallery/succulents');
                if (res.ok) {
                    const data = await res.json();
                    setSucculents(data);
                }
            } catch (err) {
                console.error('Failed to fetch gallery data', err);
            }
        }
        fetchInitialData();

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const wsUrl = `${protocol}://${window.location.host}`;

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket connected to gallery');
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === 'SUCCULENT_UPDATE') {
                    setSucculents((prev) => {
                        const index = prev.findIndex(s => s.username === message.data.username);
                        if (index >= 0) {
                            const updated = [...prev];
                            updated[index] = message.data;
                            return updated;
                        } else {
                            return [...prev, message.data];
                        }
                    });
                }
            } catch (err) {
                console.error('Failed to parse Websocket message', err);
            }
        };

        ws.current.onclose = () => {
            console.log('Websocket disconnected');
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);
    return succulents;
}