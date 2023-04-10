import React, { useState} from 'react';
import Map from './components/Map/map';
import './App.css';
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MapLoadingHolder from "./components/Map/map-loading-holder";
import Toolbar from './components/Toolbar/Toolbar';
import LocalModal from './components/Modals/LocalModal';
import InitModal from './components/Modals/InitModal';
import InitScreen from './components/OffCanvas/InitScreen';
import SatModal from './components/Modals/SatModal';
import SideBar from './components/OffCanvas/OffCanvas';
import ChartModal from './components/ChartModal/ChartModal';
import Station from './components/DataModels/Station4';
import useWindowDimensions from "./utils/useWindowDimensions";


export type Basin = {
  id: number;
  bName: string;
}

const App:React.FC = () => {

  const { height, width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [offCanvas, setOffCanvas] = useState(false);
  const [radarModal, setRadarModal] = useState(false);
  const [satModal, setSatModal] = useState(false);
  const [localModal, setLocalModal] = useState(false);
  const [initModal, setInitModal] = useState(true);
  const [initScreen, setInitScreen] = useState(true);
  const [stationObj, setStationObj] = useState<Station>();
  const [basin,setBasin] = useState<Basin>({id: 0, bName: 'none'} as Basin);

  const handleMapLoading = () => setLoading(false);

  const toggleRadarModal = () => {
  
    setRadarModal((prevState) => {
     return !prevState;
    });
  }

  const toggleSatModal = () => {
    setSatModal((prevState) => {    
     return !prevState;
    });
  }

  const toggleLocalModal = () => {
    console.log("test");
    setLocalModal((prevState) => {    
     return !prevState;
    });
  }

  const toggleInitModal = () => {
    setLocalModal((prevState) => {    
     return !prevState;
    });
  }

  const toggleDrawer = (basin: Basin) => {
    console.log("click");
    if(typeof basin !== 'undefined'){
      setBasin(basin) } else {
          setBasin({id: 0, bName: 'x'})
      }
   
    setOffCanvas((prevState) => {
       return !prevState;
      });
  }

  const [chartModal, setChartModal] = useState(false);
  const toggleChartModal = (stationObj: Station) => {
  setStationObj(stationObj);
  setChartModal((prevState) => {
    
   return !prevState;
  });
}




  return (
    <div className="App">

      <LocalModal 
      show={localModal} 
      onHide={() => setLocalModal(false)} 
      />

      <SatModal 
      show={satModal} 
      onHide={() => setSatModal(false)} 
      />

      <SideBar 
        show={offCanvas} 
        onHide={() => setOffCanvas(false)} 
        basin={basin}/>


      <Toolbar 
        drawerClickHandler={() => toggleDrawer(basin)} 
        localClickHandler={() => toggleLocalModal()} 
        satClickHandler={() => toggleSatModal()}
        widthValue={width}
      />

      {
        width > 480
          ? <InitModal show={initModal} onHide={() => setInitModal(false)} />
          : <InitScreen show={initScreen} onHide={() => setInitScreen(false)} />
      } 

      

 

     
      {chartModal && <ChartModal stationObj={stationObj} show={chartModal} onHide={() => setChartModal(false)}/> }    


       <Map
          initialOptions={{ center: [-58.59, -13.91], zoom: 4.1 }}
          onLoaded={handleMapLoading}
          showModalChart={toggleChartModal}
          drawerClickHandler={toggleDrawer}
        />


        {loading && <MapLoadingHolder className="loading-holder" />}
    </div>
  );
}

export default App;

/*
<Map
            initialOptions={{ center: [-58.59, -13.91], zoom: 4.1 }}
            onLoaded={handleMapLoading}
          />
          {loading && <MapLoadingHolder className="loading-holder" />}
*/