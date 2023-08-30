/** @format */

import React from 'react';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../Utils/useWindowDimensions.js';
import DefaultHeader from './DefaultHeader';
import MapHeader from './MapHeader';
import MobileHeader from './MobileHeader';

function HeaderLoggedIn(props) {
  const { height, width } = useWindowDimensions();
  const location = useLocation();

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      {width < 600 ? (
        <MobileHeader />
      ) : (location.pathname === '/') |
        (location.pathname === '/about-maphidro') |
        (location.pathname === '/ux') ? (
        <DefaultHeader />
      ) : (
        <MapHeader />
      )}
    </div>
  );
}

export default HeaderLoggedIn;
