import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { roundedButton, loginButtom, styleWhite, buttonStyle } from '../Utils/constants.js';

import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import TuneIcon from '@mui/icons-material/Tune';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PublicIcon from '@mui/icons-material/Public';
import useWindowDimensions from '../Utils/useWindowDimensions.js';

function DefaultHeader() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const { height, width } = useWindowDimensions();

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({
      type: 'flashMessages',
      value: 'You have successfully logged out'
    });
  }

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

  const gridRightButtons = (
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
  );

  const gridRightCompact = (
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
    </Grid>
  );

  const gridLeftButtons = (
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
  );

  const gridLeftCompact = (
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
    </Grid>
  );

  const gridProfile = (
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
  );

  const gridProfileCompact = (
    <Grid
      xs={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: '10px',
        height: '80px'
      }}>
      <div style={{ padding: '5px', margin: '0px', left: '0px' }}>
        <IconButton aria-label="settings" sx={{ ...roundedButton, width: '25px', height: '25px' }}>
          <SettingsIcon />
        </IconButton>

        <IconButton aria-label="help" sx={{ ...roundedButton, width: '25px', height: '25px' }}>
          <HelpIcon />
        </IconButton>
      </div>
      {appState.loggedIn ? (
        <Button
          aria-label="account"
          onClick={handleLogout}
          color="primary"
          sx={{ ...loginButtom, width: '60px', fontSize: '0.7rem' }}>
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
  );

  return (
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
        {width < 1280 ? gridLeftCompact : gridLeftButtons}
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
                <InputAdornment position="start" size="small">
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
              backgroundColor: styleWhite.bgButton,
              height: '20px'
            }}
          />
          <Chip
            icon={<WatchLaterIcon />}
            label="When"
            sx={{
              color: styleWhite.colorButtonTitle,
              backgroundColor: styleWhite.bgButton,
              height: '20px'
            }}
          />
          <Chip
            icon={<TuneIcon />}
            label="How"
            sx={{
              color: styleWhite.colorButtonTitle,
              backgroundColor: styleWhite.bgButton,
              height: '20px'
            }}
            onClick={toggleHow}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0} sx={{ backgroundColor: styleWhite.bg, display: 'flex' }}>
        {width < 1280 ? gridRightCompact : gridRightButtons}
        {width < 1280 ? gridProfileCompact : gridProfile}
      </Grid>
    </Box>
  );
}

export default DefaultHeader;
