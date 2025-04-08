import { createContext, useContext, useState } from 'react';
import CustomAlert from '../components/CustomAlert/CustomAlert';

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showAlert = (msg) => {
        setMessage(msg);
        setVisible(true);
    };

    const hideAlert = () => setVisible(false);

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <CustomAlert message={message} visible={visible} onClose={hideAlert} />
        </AlertContext.Provider>
    );
}

export function useAlert() {
    return useContext(AlertContext);
}
