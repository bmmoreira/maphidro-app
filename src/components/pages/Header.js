import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../../StateContext';
import Box from '@mui/material/Box';

import './main.css';
import { height } from '@mui/system';

function Header(props) {
  const appState = useContext(StateContext);

  return (
    <header className="">{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}</header>
  );
}

export default Header;
