import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import CloseButton from 'react-bootstrap/CloseButton';
import ToastContainer from 'react-bootstrap/ToastContainer';

const PlayerToast = ({ position, showAc, toggleAc, mapref }) => {
  const [imgIndex, setImgIndex] = useState(0);
  let cday = new Date();
  const [imgDate, setImgDate] = useState(cday.setDate(cday.getDate() - 9));

  const togglePlay = () => {
    const satVisibility = mapref.getLayoutProperty('radar-layer', 'visibility');

    if (satVisibility === 'visible') {
      let date = new Date(cday.getTime());

      let i = 1;
      // eslint-disable-next-line no-undef
      const timer = setInterval(() => {
        if (i < 9) {
          mapref.getSource('radar').updateImage({
            url: '/images/prec/overall/precp' + i + '.png'
          });
          i++;
          setImgDate(date.setDate(date.getDate() + 1));
        } else {
          // eslint-disable-next-line no-undef
          window.clearInterval(timer);
          setImgIndex(8);
        }
      }, 1000);
    }
  };

  const toggleRewind = () => {
    const satVisibility = mapref.getLayoutProperty('radar-layer', 'visibility');
    if (satVisibility === 'visible' && imgIndex > 1) {
      //let currentIndex = imgIndex - 1;
      mapref.getSource('radar').updateImage({
        url: '/images/prec/overall/precp' + imgIndex + '.png'
      });
      setImgIndex(imgIndex - 1);
      let date = new Date(imgDate);
      setImgDate(date.setDate(date.getDate() - 1));
    }
  };

  const toggleForward = () => {
    const satVisibility = mapref.getLayoutProperty('radar-layer', 'visibility');
    if (satVisibility === 'visible' && imgIndex < 8) {
      //let currentIndex = imgIndex + 1;
      mapref.getSource('radar').updateImage({
        url: '/images/prec/overall/precp' + imgIndex + '.png'
      });
      setImgIndex(imgIndex + 1);
      let date = new Date(imgDate);
      setImgDate(date.setDate(date.getDate() + 1));
    }
  };

  return (
    <>
      <ToastContainer
        style={{ zIndex: '3', width: '300px', marginBottom: '120px' }}
        position={position}>
        <Toast show={showAc} onClose={toggleAc}>
          <Toast.Header style={{ backgroundColor: '#3887BE', color: 'white' }} closeButton={false}>
            <strong className="mr-auto">Heatmap Control</strong>
            <CloseButton
              variant="white"
              onClick={() => toggleAc(false)}
              style={{ right: '20px', position: 'absolute' }}
            />
          </Toast.Header>
          <Toast.Body>
            <button id="a-rewind" onClick={toggleRewind} className="bar-buttons" type="button">
              <img src="./images/buttons/b-control-rewind.png" height="66" width="61" alt="Close" />
            </button>
            <button id="a-play" onClick={togglePlay} className="bar-buttons" type="button">
              <img src="./images/buttons/b-control-play.png" height="66" width="61" alt="Close" />
            </button>
            <button id="a-forward" onClick={toggleForward} className="bar-buttons" type="button">
              <img
                src="./images/buttons/b-control-forward.png"
                height="66"
                width="61"
                alt="Close"
              />
            </button>
            <br />
            Image date: {new Date(imgDate).getDate()}/{new Date(imgDate).getMonth() + 1}/
            {new Date(imgDate).getFullYear()}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default PlayerToast;
