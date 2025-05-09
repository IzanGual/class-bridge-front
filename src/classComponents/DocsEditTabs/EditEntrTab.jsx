import './DocTabs.css';
export default function EditEntrTab( {categoria} ) {
    return (
        <div className='tab-info-container'>
            <h1>Editar etrega en {categoria.nombre}</h1>
        </div>
    );
}