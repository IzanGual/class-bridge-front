import './EntregaPage.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EntregasModel from '../../classModels/EntregasModel.js';
import { checkStudentAuthStatus } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from  '../../utils/ConfirmProvider';


const getEstadoEntregaInfo = (estado) => {
  if (!estado) return { text: "Sin entregar", color: "gray" };
  if (estado.toLowerCase() === "entregada") return { text: "Entregada", color: "green" };
  if (estado.toLowerCase() === "noentregada") return { text: "No entregada", color: "red" };
  return { text: estado, color: "gray" };
};

const getEstadoCorreccionInfo = (estado) => {
  if (!estado) return { text: "Sin corrección", color: "gray" };
  if (estado.toLowerCase() === "corregida") return { text: "Corregida", color: "green" };
  if (estado.toLowerCase() === "no_corregida") return { text: "No corregida", color: "red" };
  return { text: estado, color: "gray" };
};

const getNotaInfo = (nota) => {
  if (nota === null || nota === undefined || nota === "") return { text: "Sin calificar", color: "gray" };
  if (Number(nota) >= 5) return { text: `Aprobado (${nota})`, color: "green" };
  return { text: `No aprobado (${nota})`, color: "red" };
};

const getComentarioInfo = (comentario) => {
  if (!comentario) return { text: "Sin comentarios", color: "gray" };
  return { text: comentario, color: "green" };
};

const getArchivoInfo = (archivo_url) => {
  if (!archivo_url) return { text: "No hay archivo subido", color: "gray" };
  return { text: <a href={archivo_url} target="_blank" rel="noopener noreferrer">Ver archivo</a>, color: "green" };
};

// Helpers para fechas
const getFechaLimiteInfo = (fecha_limite) => {
  if (!fecha_limite) return { text: "Sin fecha", color: "gray" };
  const hoy = new Date();
  const limite = new Date(fecha_limite);
  if (limite < hoy.setHours(0,0,0,0)) {
    return { text: fecha_limite, color: "red" }; // Pasada
  }
  return { text: fecha_limite, color: "green" }; // Aún no ha pasado
};

const getFechaEntregaInfo = (fecha_entrega, fecha_limite) => {
  if (!fecha_entrega) return { text: "No entregada", color: "gray" };
  const entrega = new Date(fecha_entrega);
  const limite = fecha_limite ? new Date(fecha_limite) : null;
  if (limite && entrega > limite) {
    return { text: fecha_entrega + " (fuera de plazo)", color: "red" };
  }
  return { text: fecha_entrega, color: "green" };
};

const EntregaPage = ({ aula }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [entrega, setEntrega] = useState(null);
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState(null); // "editar", "realizar", null
  const handleVolver = () => setActiveAction(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const showAlert = useAlert();
  const showConfirm = useConfirm();

  useEffect(() => {
    const verifyAuth = async () => {
      const loggedIn = await checkStudentAuthStatus(aula.id);
      if (!loggedIn) {
        navigate(`/bridgeto/${aula.nombre}`);
      }
    };

    const fetchEntregaInfo = async () => {
      try {
        const data = await EntregasModel.getOwnEntregaByTareaId(id);
        if (data) {
          setEntrega(data);
        } else {
          // console.log("Hubo un error consiguiendo la info de la entrega:", data);
        }
      } catch (error) {
        console.error("Error al obtener la entrega:", error);
      }
    };

    verifyAuth();
    if (id) fetchEntregaInfo();
  }, [id, aula.id, aula.nombre, navigate]);

  const fetchEntregaInfo = async () => {
      try {
        const data = await EntregasModel.getOwnEntregaByTareaId(id);
        if (data) {
          setEntrega(data);
        } else {
          // console.log("Hubo un error consiguiendo la info de la entrega:", data);
        }
      } catch (error) {
        console.error("Error al obtener la entrega:", error);
      }
    };

  if (!entrega) return <div>Cargando entrega...</div>;

  // Estado de la entrega
  const estadoEntrega = getEstadoEntregaInfo(entrega.estado);
  const estadoCorreccion = getEstadoCorreccionInfo(entrega.estado_correccion);
  const notaEntrega = getNotaInfo(entrega.nota);
  const comentarioEntrega = getComentarioInfo(entrega.comentario);
  const archivoEntrega = getArchivoInfo(entrega.archivo_url);
  const fechaLimite = getFechaLimiteInfo(entrega.fecha_limite_tarea);
  const fechaEntrega = getFechaEntregaInfo(entrega.fecha_entrega, entrega.fecha_limite_tarea);

  // Opciones según estado
  const isEntregada = entrega.estado && entrega.estado.toLowerCase() === "entregada";
  const isNoEntregada = entrega.estado && entrega.estado.toLowerCase() === "noentregada";

  
const handleSave = async () => {
  if (!selectedFile) {
    showAlert("Por favor, selecciona un archivo antes de guardar la entrega.");
    return;
  }
  const fechaActualEntrega = new Date().toLocaleDateString();

  try {
    const data = await EntregasModel.entregarEntrega(entrega.id, fechaActualEntrega, selectedFile);
    if (data) {
      showAlert("Se ha entregado todo con éxito");
      setActiveAction(null);
      setSelectedFile(null);
      await fetchEntregaInfo(); // <-- Recarga la entrega para actualizar los botones
    } else {
      // console.log("Hubo un error al entregar la entrega:", data);
    }
  } catch (error) {
    console.error("Error al obtener la entrega:", error);
  }
};

const handleDelete = async () => {
  const confirmed = await showConfirm(
    "¿Estas seguro que quieres eliminar la entrega? Se eliminara y tu profesor no podra verla."
  );

  if (!confirmed) {
    showAlert("Eliminación cancelada correctamente.");
  } else {
    const response = await EntregasModel.deleteEntrega(entrega.id);
    if (response) {
      showAlert("Entrega eliminada con éxito");
      setActiveAction(null);
      await fetchEntregaInfo(); // <-- Recarga la entrega para actualizar los botones
    } else {
      showAlert("Error al eliminar la entrega");
    }
  }
};

  return (
    <div className="dashboard-option-container">
      <div className='class-header-container'>
        <h1 className='class-title-header'>{aula.nombre}</h1>
        <p className='class-subtitle-header'>Realiza la entrega para recibir la retroacción de tu profe !!</p>
      </div>

      {/* Opciones según estado */}
      <div className="entrega-actions-row">
        {isEntregada && (
          <>
            <button
              className={`entrega-action-btn${activeAction === "editar" ? " active" : ""}`}
              onClick={() => setActiveAction("editar")}
            >
              Editar entrega
            </button>
            <button
              className="entrega-action-btn danger"
              onClick={handleDelete}
            >
              Eliminar entrega
            </button>
          </>
        )}
        {isNoEntregada && (
          <button
            className={`entrega-action-btn${activeAction === "realizar" ? " active" : ""}`}
            onClick={() => setActiveAction("realizar")}
          >
            Realizar entrega
          </button>
        )}
      </div>

      <div className='class-horizontal-separator'></div>

      {/* Contenido dinámico según acción */}
      {activeAction === "editar" && (
                <div className='apartado entrega-info-container'>
            <h3 className="entrega-titulo">{entrega.nombre_tarea}</h3>

            <div className="entrega-info-row">
              <span className="entrega-label">La entrega vence el:</span>
              <span className="entrega-value">{fechaLimite.text}
                <span className={`entrega-status-dot ${fechaLimite.color}`} />
              </span>
            </div>
              <div className="entrega-info-row">
              <span className="entrega-label">La entrega se realizó:</span>
              <span className="entrega-value">{fechaEntrega.text}
                <span className={`entrega-status-dot ${fechaEntrega.color}`} />
              </span>
            </div>
            <div className="entrega-info-row">
              <span className="entrega-label">Archivo actual:</span>
              <span className="entrega-value">{archivoEntrega.text}
                <span className={`entrega-status-dot ${archivoEntrega.color}`} />
              </span>
            </div>

            <div className="entrega-info-row">
              <span className="entrega-label">Para editar tu entrega selecciona el nuevo archivo y dale a guardar:</span>
            </div>
            <div
              className="entrega-dropzone"
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setSelectedFile(e.dataTransfer.files[0]);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <input
                type="file"
                id="file-upload"
                className="entrega-file-input"
                style={{ display: 'none' }}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload" className="entrega-dropzone-label">
                Arrastra y suelta un archivo aquí o <span className="entrega-file-link">haz clic para seleccionar</span>
              </label>
              {selectedFile && (
                <div className="entrega-file-selected">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V8.828a2 2 0 00-.586-1.414l-3.828-3.828A2 2 0 0011.172 3H6a2 2 0 00-2 2z" stroke="#2C2C2C" strokeWidth="1.5" />
                    <path d="M9 13h2M9 10h2" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="entrega-file-name">{selectedFile.name}</span>
                  <button className="entrega-file-remove" onClick={() => setSelectedFile(null)} title="Quitar archivo">
                    ×
                  </button>
                </div>
              )}
            </div>
            <p className='entrega-ifo'>Solo puedes subir un archivo y puede medir un máximo de (10MB)</p>
              <div className='action-entrega-btns-container'>
                  <button className="entrega-return-btn" onClick={handleVolver}>Volver</button>
                  <button className="entrega-save-btn" onClick={handleSave}>Guardar</button>
              </div>

          </div>
        )}
      
      {activeAction === "realizar" && (
          <div className='apartado entrega-info-container'>
            <h3 className="entrega-titulo">{entrega.nombre_tarea}</h3>

            <div className="entrega-info-row">
              <span className="entrega-label">La entrega vence el:</span>
              <span className="entrega-value">{fechaLimite.text}
                <span className={`entrega-status-dot ${fechaLimite.color}`} />
              </span>
            </div>

            <div className="entrega-info-row">
              <span className="entrega-label">Añade el fichero con tu respuesta aquí:</span>
            </div>
            <div
              className="entrega-dropzone"
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setSelectedFile(e.dataTransfer.files[0]);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <input
                type="file"
                id="file-upload"
                className="entrega-file-input"
                style={{ display: 'none' }}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload" className="entrega-dropzone-label">
                Arrastra y suelta un archivo aquí o <span className="entrega-file-link">haz clic para seleccionar</span>
              </label>
              {selectedFile && (
                <div className="entrega-file-selected">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V8.828a2 2 0 00-.586-1.414l-3.828-3.828A2 2 0 0011.172 3H6a2 2 0 00-2 2z" stroke="#2C2C2C" strokeWidth="1.5" />
                    <path d="M9 13h2M9 10h2" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="entrega-file-name">{selectedFile.name}</span>
                  <button className="entrega-file-remove" onClick={() => setSelectedFile(null)} title="Quitar archivo">
                    ×
                  </button>
                </div>
              )}
            </div>
            <p className='entrega-ifo'>Solo puedes subir un archivo y puede medir un máximo de (10MB)</p>
              <div className='action-entrega-btns-container'>
                  <button className="entrega-return-btn" onClick={handleVolver}>Volver</button>
                  <button className="entrega-return-btn" onClick={handleSave}>Guardar</button>
              </div>

          </div>
        )}

      {/* Info de la entrega solo si no hay acción activa */}
      {!activeAction && (
        <div className='apartado entrega-info-container'>
          <h3 className="entrega-titulo">{entrega.nombre_tarea}</h3>
          <div className="entrega-info-row">
            <span className="entrega-label">Estado de la entrega:</span>
            <span className="entrega-value">{estadoEntrega.text}
              <span className={`entrega-status-dot ${estadoEntrega.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Fecha límite:</span>
            <span className="entrega-value">{fechaLimite.text}
              <span className={`entrega-status-dot ${fechaLimite.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Fecha entrega:</span>
            <span className="entrega-value">{fechaEntrega.text}
              <span className={`entrega-status-dot ${fechaEntrega.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Estado corrección:</span>
            <span className="entrega-value">{estadoCorreccion.text}
              <span className={`entrega-status-dot ${estadoCorreccion.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Nota:</span>
            <span className="entrega-value">{notaEntrega.text}
              <span className={`entrega-status-dot ${notaEntrega.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Comentario:</span>
            <span className="entrega-value">{comentarioEntrega.text}
              <span className={`entrega-status-dot ${comentarioEntrega.color}`} />
            </span>
          </div>
          <div className="entrega-info-row">
            <span className="entrega-label">Archivo:</span>
            <span className="entrega-value">{archivoEntrega.text}
              <span className={`entrega-status-dot ${archivoEntrega.color}`} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


export default EntregaPage;