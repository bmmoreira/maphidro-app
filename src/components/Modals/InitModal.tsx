import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import Carousel  from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import './initmodal.css';

interface iModalProps {
  show: boolean;
  onHide(): void
  
}

const InitModal = function(props: iModalProps) {
    const { t } = useTranslation();
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton className="px-4"  >
          <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          <span className="font-title">MapHidro - {t("data_visualization")}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">

            <Image src="./images/libraries/react_small.png" alt="React"/>
            <Image src="./images/libraries/maplibre_small.png" alt="Maplibre"/>
            <Image src="./images/libraries/node_small.png" alt="Nodejs"/>
            <Image src="./images/libraries/bootstrap_small.png" alt="Bootstrap"/>
            <Image src="./images/libraries/axios2_small.png" alt="Axios"/>
            <Image src="./images/libraries/strapi_small.png" alt="Strapi"/>
            <Image src="./images/libraries/maptiler_small.png" alt="Strapi"/>
            <Image src="./images/libraries/gmt_small.png" alt="GMT"/>
            <Image src="./images/libraries/gdal_small.png" alt="GDAL"/>
            <Image src="./images/libraries/pgdocker_small.png" alt="Strapi"/>
            <Container className="d-flex justify-content-center" style={{marginTop: '10px'}}>
            <p><span className="font-init">{t("intro_text")}</span></p>
            </Container>
            <Container className="d-flex justify-content-center">
              <Row className="d-flex justify-content-center">
              <Col className="col-sm-4 text-left d-flex align-items-center"><span className="font-link2">Dissertation project for MSc in Informatics Engineering and Web Technology UAB/UTAD</span></Col>
              <Col className="col-sm-3 text-left"><Image src="./images/modals/logo_uab.png" alt="Uab_Logo" rounded/></Col>
              </Row>
            </Container>
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>{t("close")}</Button> 
        </Modal.Footer>
      </Modal>
    );
  }

  export default InitModal;