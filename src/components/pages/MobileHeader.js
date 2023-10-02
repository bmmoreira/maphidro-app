import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { useLocation } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { roundedButton } from '../Utils/constants.js';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '70%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

function MobileHeader() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const searchInputRef = React.useRef(null);
  const location = useLocation();

  function showHelpDialog() {
    appDispatch({
      type: 'toggleHelpDialog',
      value: true
    });
    console.log('HELP CLICKED!');
  }

  let timeoutId;
  const onSearchChangeHandler2 = (event) => {
    searchInputRef.current.focus();
    clearTimeout(timeoutId); // Clear any existing timeout
    const inputValue = event.target.value;

    // Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
    if (inputValue != '') {
      timeoutId = setTimeout(() => {
        // appDispatch({ type: 'togleSearchModal' });
        // Perform the desired action or function call here
        appDispatch({
          type: 'searchAction',
          searchEventValue: inputValue
        });
        appDispatch({
          type: 'toggleBackdrop',
          value: !appState.backdrop
        });
        console.log('Input value:', inputValue);
      }, 1300);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => {
              appDispatch({
                type: 'toggleDrawer',
                value: !appState.drawer
              });
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MapHidro
          </Typography>
          {(location.pathname === '/') |
          (location.pathname === '/about-maphidro') |
          (location.pathname === '/ux') ? (
            ''
          ) : (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  ref={searchInputRef}
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
                  placeholder="Search…"
                  onChange={(e) => {
                    onSearchChangeHandler2(e);
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <IconButton
                aria-label="help"
                sx={{ ...roundedButton, marginLeft: '5px' }}
                onClick={showHelpDialog}>
                <HelpIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MobileHeader;
