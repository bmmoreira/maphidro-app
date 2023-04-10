import Offcanvas from "react-bootstrap/Offcanvas";
import "./offcanvas.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "react-bootstrap";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'

type SidebarProps = {
  show: boolean;
  onHide(): void;
 
}

const InitScreen = function (props: SidebarProps) {
  const { t } = useTranslation();

/*   const [basinId,setBasinId] = useState(null);
  useEffect(() => {
    if (typeof props.basin !== 'undefined'){
      setBasinId(props.basin);
    } else {
      setBasinId(0);
    }
    setBasinId(props.basin);
    return () => {
    };
  }, [props]); */
    return (
      <> <div  >
        <Offcanvas show={props.show} onHide={props.onHide} className={ 'main2' } >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>MapHidro App</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
          <div className={ 'sc-logo' }>          <img src="./images/libraries/mh.png" alt="React"/>
</div>
            <div>
          <img src="./images/libraries/react_small3.png" alt="React"/>
            <img src="./images/libraries/maplibre_small3.png" alt="Maplibre"/>
            <img src="./images/libraries/node_small3.png" alt="Nodejs"/>
            <img src="./images/libraries/strapi_small3.png" alt="Strapi"/>
            <img src="./images/libraries/maptiler_small3.png" alt="Strapi"/>
            <img src="./images/libraries/gmt_small3.png" alt="GMT"/>
            <img src="./images/libraries/gdal_small3.png" alt="GDAL"/>
            <img src="./images/libraries/pgdocker_small3.png" alt="Strapi"/>
            </div>
            <Container className="d-flex justify-content-center" style={{marginTop: '10px'}}>
            <p><span className="font-init">{t("intro_text")}</span></p>
            </Container>
            <Container className="d-flex justify-content-center">
              <Row className="d-flex justify-content-center">
              <Col className="col-sm-4 text-left d-flex align-items-center"><span className="font-link2">Dissertation project for MSc in Informatics Engineering and Web Technology UAB/UTAD</span></Col>
              <Col className="col-sm-3 text-left"><Image src="./images/modals/logo_uab.png" alt="Uab_Logo" rounded/></Col>
              </Row>
            </Container>
            <Button onClick={props.onHide} className={ 'bt1' }>Ir ao aplicativo</Button>
          </Offcanvas.Body>
        </Offcanvas>
        </div>
      </>
    );
  }


  export default InitScreen;