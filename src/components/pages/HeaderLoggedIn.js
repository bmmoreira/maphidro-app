/** @format */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { roundedButton, loginButtom, styleWhite } from '../Utils/constants.js';
import useWindowDimensions from '../Utils/useWindowDimensions.js';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';

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

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const { height, width } = useWindowDimensions();

  function SearchAppBar() {
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
                placeholder="Search…"
                onChange={(e) => {
                  /*  appDispatch({
                    type: 'toggleOverlay',
                    value: !appState.overlay
                  }); */
                  onSearchChangeHandler2(e);
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  const buttonStyle = {
    backgroundColor: styleWhite.bgButton,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    fontSize: '0.9rem',
    height: '80px',
    width: '80px',
    borderRadius: '5px',
    color: styleWhite.colorButtonTitle,
    '&:hover': {
      backgroundColor: styleWhite.bgButtonHover,
      borderColor: styleWhite.borderColorHover,
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: styleWhite.bgButtonActive,
      borderColor: styleWhite.borderColorActive
    },
    '&:focus': {
      boxShadow: styleWhite.boxShadowFocus
    }
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  function toggleTimeline() {
    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    appDispatch({ type: 'togleTimeLineModal' });
  }

  function toggleProjects() {
    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    appDispatch({ type: 'togleProjectsModal' });
  }

  function toggleSelect() {
    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    setTimeout(() => {
      appDispatch({
        type: 'togleSelectModal',
        value: true
      });
    }, 200);
  }

  function toggleDownload() {
    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    appDispatch({ type: 'togleSearchModal' });
  }

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({
      type: 'flashMessages',
      value: 'You have successfully logged out'
    });
  }

  const toggleHow = () => {
    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    setTimeout(() => {
      appDispatch({
        type: 'togleHowModal',
        value: true
      });
    }, 200);
  };

  let timeoutId;
  const onSearchChangeHandler = (event) => {
    const inputValue = event.target.value;

    clearTimeout(timeoutId); // Clear any existing timeout

    if (!appState.modals.panelBox) {
      appDispatch({ type: 'toglePanelModal', value: !appState.modals.panelBox });
    }
    // Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
    if (inputValue != '') {
      timeoutId = setTimeout(() => {
        // Perform the desired action or function call here
        appDispatch({ type: 'closeSearchModal' });
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

  const onSearchChangeHandler2 = (event) => {
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
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      {width < 600 ? (
        <SearchAppBar />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: { xs: 'center', md: 'center' },
            backgroundColor: styleWhite.bgBox,
            height: '90px',
            m: 0
          }}>
          <Grid
            container
            spacing={0}
            sx={{
              m: 0
            }}>
            <Grid
              xs={4}
              sx={{
                backgroundColor: styleWhite.bg,
                display: 'flex',
                paddingRight: '20px',
                justifyContent: 'right'
              }}>
              <img src="assets/mh_logo.png" alt="maphidro logo" />
            </Grid>
            <Grid
              xs={8}
              sx={{
                backgroundColor: styleWhite.bg,
                display: 'flex',
                gap: '10px'
              }}>
              <IconButton
                aria-label={notificationsLabel(100)}
                sx={{ ...buttonStyle }}
                onClick={toggleProjects}>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={1}
                  color="secondary">
                  <BookIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Projects</div>
              </IconButton>
              <IconButton
                aria-label={notificationsLabel(100)}
                sx={{ ...buttonStyle }}
                onClick={toggleTimeline}
                disabled>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={15}
                  color="secondary">
                  <HistoryIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Timeline</div>
              </IconButton>
              <IconButton
                aria-label={notificationsLabel(100)}
                sx={{ ...buttonStyle }}
                onClick={toggleDownload}
                disabled>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={23}
                  color="secondary">
                  <DownloadIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Download</div>
              </IconButton>
            </Grid>
          </Grid>

          <Grid container spacing={0} sx={{ backgroundColor: styleWhite.bg, display: 'flex' }}>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                height: '40px',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TextField
                hiddenLabel
                size="small"
                placeholder="search for stations"
                sx={{
                  width: '400px',
                  fontStyle: 'italic',
                  height: '20px'
                }}
                onChange={(e) => {
                  onSearchChangeHandler(e);
                }}
                InputProps={{
                  style: {
                    border: '1px solid #cccccc',

                    height: '35px',
                    padding: '0px 0px 0px 0px',
                    backgroundColor: '#b3e5f7'
                  },
                  startAdornment: (
                    <InputAdornment size="small">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                height: '40px',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Chip
                icon={<PublicIcon />}
                label="Where"
                sx={{
                  color: styleWhite.colorButtonTitle,
                  backgroundColor: styleWhite.bgButton
                }}
              />
              <Chip
                icon={<WatchLaterIcon />}
                label="When"
                sx={{
                  color: styleWhite.colorButtonTitle,
                  backgroundColor: styleWhite.bgButton
                }}
              />
              <Chip
                icon={<TuneIcon />}
                label="How"
                sx={{
                  color: styleWhite.colorButtonTitle,
                  backgroundColor: styleWhite.bgButton
                }}
                onClick={toggleHow}
              />
            </Grid>
          </Grid>

          <Grid container spacing={0} sx={{ backgroundColor: styleWhite.bg, display: 'flex' }}>
            <Grid
              xs={8}
              sx={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
              }}>
              <IconButton
                aria-label={notificationsLabel(appState.header.counterSelect)}
                sx={{ ...buttonStyle }}
                onClick={toggleSelect}>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={appState.header.counterSelect}
                  color="secondary">
                  <AddLocationAltIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Select</div>
              </IconButton>
              <IconButton aria-label={notificationsLabel(100)} sx={{ ...buttonStyle }} disabled>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={3}
                  color="secondary">
                  <FilterAltIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Filters</div>
              </IconButton>

              <IconButton aria-label={notificationsLabel(100)} sx={{ ...buttonStyle }} disabled>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={22}
                  color="secondary">
                  <AutoAwesomeMotionIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
                </Badge>
                <div>Results</div>
              </IconButton>
            </Grid>

            <Grid
              xs={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                paddingRight: '20px',
                height: '80px'
              }}>
              <div>
                <IconButton aria-label="settings" sx={{ ...roundedButton }}>
                  <SettingsIcon />
                </IconButton>
                <IconButton aria-label="mail" sx={{ ...roundedButton }}>
                  <MailIcon />
                </IconButton>
                <IconButton aria-label="help" sx={{ ...roundedButton }}>
                  <HelpIcon />
                </IconButton>
              </div>
              {appState.loggedIn ? (
                <Button
                  aria-label="account"
                  onClick={handleLogout}
                  endIcon={<LogoutIcon />}
                  color="primary"
                  sx={{ ...loginButtom }}>
                  Log out
                </Button>
              ) : (
                <Button
                  aria-label="logout"
                  endIcon={<PersonIcon />}
                  color="primary"
                  sx={{ ...loginButtom }}>
                  Log in
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default HeaderLoggedIn;
