import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Book';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
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
import PublicIcon from '@mui/icons-material/Public';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const theme = createTheme({
    components: {
      // Name of the component

      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '0.8rem',
            border: `2px dashed blue`,
            height: '50px',
            width: '80px'
          }
        }
      }
    }
  });
  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({
      type: 'flashMessages',
      value: 'You have successfully logged out'
    });
  }

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: { xs: 'center', md: 'center' },
          height: '90px',
          m: 0
        }}>
        <Grid
          container
          spacing={0}
          sx={{
            m: 0
          }}>
          <Grid xs={4} sx={{ backgroundColor: '#f0f0f0' }}>
            <img src="images/mh_logo.png" />
          </Grid>
          <Grid xs={8} sx={{ backgroundColor: '#f0f0f0', display: 'flex', gap: '10px' }}>
            <IconButton
              aria-label={notificationsLabel(100)}
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
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
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
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
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
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

        <Grid container spacing={0} sx={{ backgroundColor: '#f0f0f0', display: 'flex' }}>
          <Grid
            xs={12}
            sx={{
              display: 'flex',
              height: '40px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TextField
              label="search stations"
              size="small"
              sx={{
                width: '400px',

                fontStyle: 'italic',
                borderRadius: '20%'
              }}
              InputProps={{
                style: {
                  border: '1px solid #EAEAEA',
                  borderRadius: '25px',
                  height: '30px',
                  padding: '0px 0 0px 0px',
                  backgroundColor: 'white'
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
            <Chip icon={<PublicIcon />} label="Where" />
            <Chip icon={<WatchLaterIcon />} label="When" />
            <Chip icon={<TuneIcon />} label="How" />
          </Grid>
        </Grid>

        <Grid container spacing={0} sx={{ backgroundColor: '#f0f0f0', display: 'flex' }}>
          <Grid
            xs={8}
            sx={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}>
            <IconButton
              aria-label={notificationsLabel(100)}
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                badgeContent={7}
                color="secondary">
                <AddLocationAltIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
              </Badge>
              <div>Select</div>
            </IconButton>
            <IconButton
              aria-label={notificationsLabel(100)}
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
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

            <IconButton
              aria-label={notificationsLabel(100)}
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '80px',
                width: '80px',
                borderRadius: '5px'
              }}>
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
              <IconButton aria-label="delete" color="primary">
                <SettingsIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary">
                <MailIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary">
                <HelpIcon />
              </IconButton>
            </div>
            <Button
              aria-label="delete"
              endIcon={<PersonIcon />}
              color="primary"
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                fontSize: '0.9rem',
                height: '30px',
                width: '140px',
                borderRadius: '5px',
                marginTop: '5px'
              }}>
              Log in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HeaderLoggedIn;
