import { createContext, useContext, useState } from 'react';
import CustomConfirm from '../components/CustomConfirm/CustomConfirm';
const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
    const [visible, setVisible] = useState(false);
    const [question, setQuestion] = useState('');
    const [resolveCallback, setResolveCallback] = useState(null);

    const showConfirm = (question) => {
        return new Promise((resolve) => {
            setQuestion(question);
            setVisible(true);
            setResolveCallback(() => resolve);
        });
    };

    const handleConfirm = () => {
        setVisible(false);
        if (resolveCallback) resolveCallback(true);
    };

    const handleCancel = () => {
        setVisible(false);
        if (resolveCallback) resolveCallback(false);
    };

    return (
        <ConfirmContext.Provider value={showConfirm}>
            {children}
            <CustomConfirm 
                question={question} 
                visible={visible} 
                onConfirm={handleConfirm} 
                onCancel={handleCancel} 
            />
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    return useContext(ConfirmContext);
}