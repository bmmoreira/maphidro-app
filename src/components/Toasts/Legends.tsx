import React from 'react'
import Toast from "react-bootstrap/Toast";
import CloseButton from "react-bootstrap/CloseButton";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";

interface LegendProp {
  showLg: boolean;
  toggleLg(): void;
  position: ToastPosition;
}

const Legends = (props: LegendProp) => {
    return (
      <>
        <ToastContainer
          style={{ zIndex: "3", width: "150px", marginRight: "15px", marginBottom: '110px' }}
          position={props.position}
        >
          <Toast show={props.showLg} onClose={props.toggleLg}>
            <Toast.Header
              style={{ backgroundColor: "#3887BE", color: "white" }}
              closeButton={false}
            >
              <strong className="mr-auto">1-d Rainfall</strong>
              <CloseButton
                variant="white"
                onClick={() => props.toggleLg}
                style={{ right: "20px", position: "absolute" }}
              />
            </Toast.Header>
            <Toast.Body>
              Accum.(GPM)
            <img src="./images/prec/legend3.png" alt="Legend" /><br/>
              Source: INPE
              
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  };

  export default Legends;