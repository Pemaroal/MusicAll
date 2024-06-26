import React from "react";
import { ListGroup, Modal, ModalTitle } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useAccountController from "../controllers/AccountController";

// Componente ModalAccount para mostrar información de la cuenta y acciones disponibles
function ModalAccount({ showModal, handleCloseModal }) {
  // Obtiene datos de la cuenta y la función de logout del AccountController
  const { account, logout } = useAccountController();
  
  // Función para navegación entre vistas
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Cierra la sesión del usuario
    handleCloseModal(); // Cierra el modal después de cerrar sesión
  };

  return (

    // Modal con ajustes de cuentas y configuración
    <Modal show={showModal} onHide={handleCloseModal} id="AccountConf-modal" contentClassName="bg-light">

      {/**Cabecera con botón cerrar */}
      <Modal.Header className="pb-0 border-0" closeButton>
        <ModalTitle className="fw-bold">MusicAll</ModalTitle>
      </Modal.Header>

      {/**Cuerpo del modal */}
      <Modal.Body>
        {/**"Tarjeta" con datos básicos del usuario */}
        <div className="d-flex bg-white p-2 rounded-pill border">

          {/**Foto de perfil 
           * TODO: añadir opción para cambiarla*/}
          <PersonFill
            className="d-flex"
            style={{
              height: "75px",
              width: "75px",
              padding: "10px",
              borderRadius: "50%",
              border: "2px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "",
            }}
          />

          {/**Datos: Nombre + Apellido, email */}
          <div className="d-grid my-auto">
          {/**Verifica si hay datos de cuenta disponible */}
          {account ? ( 
              <>
                <strong className="ms-3 text-capitalize">
                  {account.name} {account.surname}
                </strong>
                <small className="rounded-pill text-center bg-body-tertiary ms-3 px-2">
                  {account.email}
                </small>
              </>
            ) : (
              <> {/* Si no hay datos de cuenta */}
                <strong className="ms-3 text-capitalize">Nombre de usuario</strong>
                <small className="rounded-pill text-center bg-body-tertiary ms-3 px-2">
                  correo electrónico
                </small>
              </>
            )}
          </div>
        </div>

        {/**Lista de acciones disponibles para el usuario */}
        <ListGroup className="rounded-4 my-3">
          
          {/**Botón para ver el perfil del usuario */}
          <button
            type="button"
            onClick={() => {
              navigate("/usuario"); // Navega a la vista del perfil del usuario
              handleCloseModal(); // Cierra el modal después de hacer clic en el botón, si no sigue activo en la siguiente pantalla
            }}
            className="list-group-item text-start"
            disabled={!account} // Lo deshabilita si no hay datos de cuenta
          >
            Mi perfil
          </button>

          <div className="d-flex mt-2"></div>

          {/** Botón para iniciar sesión */}
          <button
            type="button"
            onClick={() => navigate("/login")} // Navega a la vista de inicio de sesión
            className="list-group-item text-start"
            disabled={account ? true : false} // Lo deshabilita si ya hay una cuenta iniciada
          >
            Iniciar sesión
          </button>

          {/** Botón para registrarse */}
          <button
            type="button"
            onClick={() => navigate("/registro")} // Navega a la vista de registro
            className="list-group-item text-start"
            disabled={account ? true : false} // Lo deshabilita si ya hay una cuenta iniciada
          >
            Registrarse
          </button>

          {/** Botón para cerrar sesión */}
          <button
            type="button"
            onClick={handleLogout} // Llama a la función para cerrar sesión
            className="list-group-item text-start"
            disabled={!account} // Lo deshabilita si no hay una cuenta iniciada
          >
            Cerrar sesión
          </button>

           {/**Añadir botones para eliminar cuenta, ver informacion de grupos o lo que sea oportuno */}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAccount; // Exporta el componente ModalAccount
