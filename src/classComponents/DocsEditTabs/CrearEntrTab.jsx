import './DocTabs.css';
export default function CrearEntrTab( {categoria} ) {
    return (
        <div className='tab-info-container'>
            <h1>crear entrega en {categoria.nombre}</h1>
        </div>
    );
}