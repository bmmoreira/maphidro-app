import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useFetch from '../../utils/useFetch';
import { useTranslation } from "react-i18next";
import { API_URL_IMERGE } from '../../utils/constants';
import Spinner from "react-bootstrap/Spinner";

 interface SatProps {
  show: boolean;
  onHide(): void
}

type fetchData = {
  estate: any;
  error: string | null;
  boolean: boolean;
} 

const SatModal = function (props: SatProps) {
const { t, i18n } = useTranslation();

  
/*   const { loading, error, estate } = useFetch('https://api.maphidro.info/api/imerge');
  //if (loading) return <p> Loading... </p>;
  if (error) return <p> Error : </p>;
  
  if(loading) return <Spinner animation={"border"}/>; */

  return ( 
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mh-modal"
    >
      <Modal.Header closeButton className="px-4">
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          <span className="font-title">{t("constellation_gpm")}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src="./images/modals/gpm_logo.png" alt="GPM-Logo" />
        <img src="./images/modals/inpe_logo.png" alt="INPE-Logo" />
        <img src="./images/modals/cptec_logo.png" alt="CPTEC-Logo" />
        <p>
          <span className="font-init">
          This application uses precipitation data provided by the Center for Weather Forecasting and Climate Studies (CPTEC), a division of the National Institute for Space Research (INPE). The MERGE product has been generated using the Global Precipitation Measurement (GPM) Integrated Multi-satellite Retrievals for GPM (IMERG) data. More details on the technique can be found at (Rozante et al.,2010)
            <a href="http://ftp.cptec.inpe.br/modelos/tempo/MERGE/rozante_et.al.2010.pdf">
              (Rozante et al.,2010)
            </a>
          </span>
        </p>
        <img
          src="./images/modals/gpm_constellation.png"
          alt="GPM-Constellation"
        />
        <p>
        <span className="font-init">NASA's Global Precipitation Measurement Mission (GPM) uses satellites to measure Earth's rain and snowfall for the benefit of humanity. Launched by NASA and JAXA on February 27, 2014, the GPM is an international mission that sets the standard for measurements of precipitation in space. Using a network of satellites joined by the GPM Core Observatory.</span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{t("close")}</Button>
      </Modal.Footer>
    </Modal>
);
};

export default SatModal;
