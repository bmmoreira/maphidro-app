import Offcanvas from "react-bootstrap/Offcanvas";
import "./offcanvas.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SidebarProps = {
  show: boolean;
  onHide(): void;
  basin: {
    id: number;
    bName: string;
  };
}

const SideBar = function (props: SidebarProps) {
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
        <Offcanvas show={props.show} onHide={props.onHide} className={ 'main' } >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{t("about_app")}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
          
          {t("intro_text")}
          </Offcanvas.Body>
        </Offcanvas>
        </div>
      </>
    );
  }


  export default SideBar;