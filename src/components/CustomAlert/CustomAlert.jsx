import { useEffect } from 'react';
import './CustomAlert.css';

export default function CustomAlert({ message, visible, onClose }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000); //10s
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className="custom-alert">
            <span className="close-btn" onClick={onClose}>&times;</span>
            {message}
        </div>
    );
}
