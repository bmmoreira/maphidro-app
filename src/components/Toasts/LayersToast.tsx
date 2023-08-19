import React from 'react';
import { useContext } from 'react';
import StateContext from '../../StateContext';
import Toast from 'react-bootstrap/Toast';
import CloseButton from 'react-bootstrap/CloseButton';
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer';
import LayerItem from './LayerItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layertoast.css';

type layerType = {
  layerId: string;
  name: string;
  checked: boolean;
  added: boolean;
};

interface ToastProp {
  showLc: boolean;
  toggleLc(): void;
  position: ToastPosition;
  layers: layerType[];
  onLayersHandleChange(layerId: string): void;
}

const LayersToast = (props: ToastProp) => {
  const appState = useContext(StateContext);
  const mapLayers: layerType[] = appState.mapLayers;

  return (
    <>
      <ToastContainer
        style={{ zIndex: '3', width: '300px', marginBottom: '280px' }}
        position={props.position}>
        <Toast show={props.showLc} onClose={props.toggleLc}>
          <Toast.Header style={{ backgroundColor: '#3887BE', color: 'white' }} closeButton={false}>
            <strong className="mr-auto">Layers Control</strong>
            <CloseButton
              variant="white"
              onClick={props.toggleLc}
              style={{ right: '20px', position: 'absolute' }}
            />
          </Toast.Header>
          <Toast.Body style={{ paddingTop: '0px' }}>
            <div className="container pt-3 lc">
              {props.layers &&
                mapLayers.map((layer, idx) => (
                  <LayerItem
                    key={idx}
                    layer={layer}
                    handleChange={() => props.onLayersHandleChange(layer.layerId)}
                  />
                ))}
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default LayersToast;
