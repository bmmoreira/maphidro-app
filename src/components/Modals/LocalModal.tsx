import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button  from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import CSS from 'csstype';
import "./modals.css"

interface LocalProps {
  show: boolean;
  onHide(): void
}

const LocalModal = function(props: LocalProps) {
  const { t } = useTranslation();
  const spanStyle: CSS.Properties = {
    'textAlign': 'left',
    'color': 'red'
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mh-modal"
      >
        <Modal.Header closeButton className="px-4" >
          <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          <span className="font-title">{t("pluviometric_stations")}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{t("hydrological_network")}</h5>
          <img src="./images/modals/ana.png" alt="ANA"/>
            
          <div className="modal-text"><span >
          {t("intro_ana")}</span>
          </div>
          <img src="./images/modals/redepluviometrica.png" alt="Rede-ANA"/>
          <p><span className="font-init">{t("details_ana")}: <a href='https://www.snirh.gov.br/hidroweb/apresentacao'>Hidroweb</a></span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>{t("close")}</Button> 
        </Modal.Footer>
      </Modal>
    );
  }

  export default LocalModal;