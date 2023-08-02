import React, { useState, useEffect } from 'react';
import Map from './components/Map/map';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:3000';

import { useImmerReducer } from 'use-immer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import Station from './components/DataModels/Station4';
import useWindowDimensions from './utils/useWindowDimensions';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import About from './components/pages/About';
import Terms from './components/pages/Terms';
import HomeGuest from './components/pages/HomeGuest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CreatePost from './components/pages/CreatePost';
import ViewSinglePost from './components/pages/ViewSinglePost';
import FlashMessages from './components/pages/FlashMessages';
import NotFound from './components/pages/NotFound';
import MapGuest from './components/pages/MapGuest';

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
    },
    loggedIn: Boolean(localStorage.getItem('mapHidroToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('mapHidroToken'),
      username: localStorage.getItem('mapHidroUsername'),
      avatar: localStorage.getItem('mapHidroAvatar')
    },
    isSearchOpen: false,
    isChatOpen: false,
    unreadChatCount: 0
  };

  /*Goal that all of our loading and saving user related actions takes place in one place
now have the user object that will be available in our global or app wide state.
So now any other component that needs to access this data will no longer need to talk
to the browser's localStorage. It can just find these values in State. 
But we need to ask ourselves how should these values get set into localStorage 
in the first place when you perform a successful login?
Well, we would also want to perform that within our Main.js file.
we first need to actually save these values into localStorage in the first place when you log in
because remember we just commented out that code within HeaderLoggedOut. Now, technically yes, 
we could just include code right here(Reducer Function) in this case that saves it into localStorage. 
But philosophically, we want to keep our Reducer pure in terms of it only working
with React ish things or only working with State. In other words if we need to do 
something that's considered a side effect like directly changing the browser's dom
in rare situations, or in this case working with the browser's local storage
we should probably do those types of things within a useEffect.
  */

  function mapReducer(draft: any, action: any) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true;
        draft.user = action.data;
        break;
      case 'logout':
        draft.loggedIn = false;
        break;
      case 'flashMessages':
        draft.flashMessages.push(action.value);
        break;
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
  /*
    Immer gives us a copy of state. A perfectly cloned copy that we are free to modify and change however we want.
    And then Immer will automatically handle the task of giving that draft object back to React.
   */
  const [state, dispatch] = useImmerReducer(mapReducer, initialState);

  // when state.loggedIn change from dispatch in several places fires useEffect

  useEffect(() => {
    /*
    If that was just set and now it's true,
    then this is where we would want to save data
    into localStorage.
    */
    if (state.loggedIn) {
      localStorage.setItem('mapHidroToken', state.user.token!);
      localStorage.setItem('mapHidroUsername', state.user.username!);
      localStorage.setItem('mapHidroAvatar', state.user.avatar!);
    } else {
      /*
      Else otherwise, well, if it just got set to false
      that means you just logged out.
      So this is where we can delete
      or remove that data from localStorage.
      */
      localStorage.removeItem('mapHidroToken');
      localStorage.removeItem('mapHidroUsername');
      localStorage.removeItem('mapHidroAvatar');
    }
  }, [state.loggedIn]);

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
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-ignore */}
            <FlashMessages messages={state.flashMessages} />
            <Header />
            <Routes>
              <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
              <Route
                path="/map"
                element={
                  state.loggedIn ? (
                    <Map
                      initialOptions={{ center: [-55.59, -15.91], zoom: 4.1 }}
                      onLoaded={handleMapLoading}
                      showModalChart={toggleChartModal}
                      drawerClickHandler={toggleDrawer}
                      offCanvas={offCanvas}
                      setOffCanvas={setOffCanvas}
                    />
                  ) : (
                    <MapGuest />
                  )
                }
              />
              <Route path="/post/:id" element={<ViewSinglePost />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/about-maphidro" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
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
