import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { roundedButton, loginButtom, styleWhite } from '../Utils/constants.js';
import { useTranslation } from 'react-i18next';

import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function DefaultHeader() {
  const { t } = useTranslation();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({
      type: 'flashMessages',
      value: 'You have successfully logged out'
    });
  }

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
        <Grid
          xs={8}
          sx={{
            backgroundColor: styleWhite.bg,
            display: 'flex',
            gap: '10px'
          }}></Grid>
      </Grid>

      <Grid container spacing={0} sx={{ backgroundColor: styleWhite.bg, display: 'flex' }}>
        <Grid
          xs={12}
          sx={{
            display: 'flex',
            height: '80px',
            justifyContent: 'center',
            alignItems: 'center'
          }}></Grid>
      </Grid>

      <Grid container spacing={0} sx={{ backgroundColor: styleWhite.bg, display: 'flex' }}>
        <Grid
          xs={8}
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}></Grid>
        <Grid
          xs={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            alignContent: 'center',
            justifyContent: 'center',
            paddingRight: '20px',
            height: '80px'
          }}>
          {appState.loggedIn ? (
            <Button
              aria-label="account"
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
              color="primary"
              sx={{ ...loginButtom }}>
              {t('logout')}
            </Button>
          ) : (
            <Button
              aria-label="logout"
              endIcon={<PersonIcon />}
              color="primary"
              sx={{ ...loginButtom }}>
              {t('login')}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DefaultHeader;
