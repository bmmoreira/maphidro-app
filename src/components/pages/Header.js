import React, { useContext } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../../StateContext';

function Header(props) {
  const appState = useContext(StateContext);

  return (
    <header className="">{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}</header>
  );
}

export default Header;
