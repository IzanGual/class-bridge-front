import './CustomConfirm.css';

export default function CustomConfirm({ question, visible, onConfirm, onCancel }) {
    if (!visible) return null;

    return (
        <div className="custom-confirm-overlay">
            <div className="custom-confirm">
                <div className="confirm-box">
                    <p>{question}</p>
                    <div className="confirm-actions">
                        <button className="btn-confirm" onClick={onConfirm}>Aceptar</button>
                        <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}