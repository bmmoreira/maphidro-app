import Modal from 'react-bootstrap/Modal';
import Button  from "react-bootstrap/Button";
import React from 'react'

const RadarModal = function(props) {


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Aplicativo em desenvolvimento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Componente de Visualização de Informações de Camada</h4>
          <p>
          Em desenvolvimento..aguarde.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button> 
        </Modal.Footer>
      </Modal>
    );
  }

  export default RadarModal;