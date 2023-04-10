import React from 'react'
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface Props {
  showAn: boolean;
  toggleAn: () => void;
  position: any;
}

const AnimToast: React.FC<Props> = ({
  showAn,
  toggleAn,
  position,
}) => {
    return (
      <>
        <ToastContainer
        position={position}
          style={{ zIndex: "3", width: "300px", marginRight: "20px" }}
          
        >
          <Toast
            show={showAn}
            onClose={toggleAn}
            delay={1500}
            autohide
          >
            <Toast.Header
              style={{ backgroundColor: "#3887BE", color: "white" }}
              closeButton={false}
            >
              <strong className="mr-auto">Precipitation</strong>
            </Toast.Header>
            <Toast.Body>
              {" "}
              Rainfall last 7 days... {""}
              <span role="img" aria-label="tada">
                ☂
              </span>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  };

  export default AnimToast;