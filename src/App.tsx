import React, { useState } from 'react';
import Map from './components/Map/map';
import './App.css';
import './global.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3002';

import { useImmerReducer } from 'use-immer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import MapLoadingHolder from './components/Map/map-loading-holder';
import Toolbar from './components/Toolbar/Toolbar';
import LocalModal from './components/Modals/LocalModal';
import InitModal from './components/Modals/InitModal';
import InitScreen from './components/OffCanvas/InitScreen';
import SatModal from './components/Modals/SatModal';
import SideBar from './components/OffCanvas/OffCanvas2';
import ChartModal from './components/ChartModal/ChartModal';
import Station from './components/DataModels/Station4';
import useWindowDimensions from './utils/useWindowDimensions';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export type Basin = {
  id: number;
  bName: string;
};

const App: React.FC = () => {
  const initialState = {
    stationData: {},
    localData: {},
    satData: {},
    dataSatLoaded: false,
    dataLocLoaded: false,
    barChart: {
      yearSelectSatData: 0,
      yearSelectLocData: 0,
      locBar: {},
      satbar: {}
    }
  };

  function mapReducer(draft: any, action: any) {
    switch (action.type) {
      case 'loadStation':
        draft.stationData = action.value;
        break;
      case 'loadLocal':
        draft.localData = action.value;
        draft.dataLocLoaded = action.loaded;
        break;
      case 'loadSat':
        draft.satData = action.value;
        draft.dataSatLoaded = action.loaded;
        break;
      case 'loadData':
        draft.stationData = action.infoValue;
        draft.satData = action.satValue;
        draft.localData = action.locValue;
        draft.dataSatLoaded = action.locDataloaded;
        draft.dataLocLoaded = action.satDataloaded;
        () => {
          toggleChartModal();
        };
        break;
      case 'chart':
        draft.barChart.locBar = action.locBar;
        //draft.barChart.satBar = action.satBar;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(mapReducer, initialState);

  const { height, width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [offCanvas, setOffCanvas] = useState(false);
  const [radarModal, setRadarModal] = useState(false);
  const [satModal, setSatModal] = useState(false);
  const [localModal, setLocalModal] = useState(false);
  const [initModal, setInitModal] = useState(true);
  const [initScreen, setInitScreen] = useState(true);
  const [stationObj, setStationObj] = useState<Station>();
  const [basin, setBasin] = useState<Basin>({ id: 0, bName: 'none' } as Basin);

  const handleMapLoading = () => setLoading(false);

  const toggleRadarModal = () => {
    setRadarModal((prevState) => {
      return !prevState;
    });
  };

  const toggleSatModal = () => {
    setSatModal((prevState) => {
      return !prevState;
    });
  };

  const toggleLocalModal = () => {
    console.log('test');
    setLocalModal((prevState) => {
      return !prevState;
    });
  };

  const toggleInitModal = () => {
    setLocalModal((prevState) => {
      return !prevState;
    });
  };

  const toggleDrawer = (basin: Basin) => {
    console.log('click');
    if (typeof basin !== 'undefined') {
      setBasin(basin);
    } else {
      setBasin({ id: 0, bName: 'x' });
    }

    setOffCanvas((prevState) => {
      return !prevState;
    });
  };

  const [chartModal, setChartModal] = useState(false);
  const toggleChartModal = () => {
    //setStationObj(stationObj);
    setChartModal((prevState) => {
      return !prevState;
    });
  };

  /*   const toggleChartModal = (stationObj: Station) => {
    setStationObj(stationObj);
    setChartModal((prevState) => {
      return !prevState;
    });
  }; */

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <Map
              initialOptions={{ center: [-55.59, -15.91], zoom: 4.1 }}
              onLoaded={handleMapLoading}
              showModalChart={toggleChartModal}
              drawerClickHandler={toggleDrawer}
              offCanvas={offCanvas}
              setOffCanvas={setOffCanvas}
            />

            {loading && <MapLoadingHolder className="loading-holder" />}
          </div>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;

/*
<Map
            initialOptions={{ center: [-58.59, -13.91], zoom: 4.1 }}
            onLoaded={handleMapLoading}
          />
          {loading && <MapLoadingHolder className="loading-holder" />}
*/
