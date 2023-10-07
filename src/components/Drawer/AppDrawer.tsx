import React, { useContext } from 'react';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import MailIcon from '@mui/icons-material/Mail';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const { t } = useTranslation();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      appDispatch({
        type: 'toggleDrawer',
        value: !appState.drawer
      });

      setState((prevState) => !prevState);
    };

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({
      type: 'flashMessages',
      value: 'You have successfully logged out'
    });
  }

  function showSelectDialog() {
    appDispatch({
      type: 'toggleSelectDialog',
      value: true
    });
    console.log('Select CLICKED!');
  }

  function showHelpDialog() {
    appDispatch({
      type: 'toggleHelpDialog',
      value: true
    });
    console.log('HELP CLICKED!');
  }

  function showSettingsDialog() {
    appDispatch({
      type: 'toggleSettingsDialog',
      value: true
    });
    console.log('Settings CLICKED!');
  }

  const itemsListMap = [
    {
      text: t('home'),
      icon: <HomeIcon />,
      onClick: () => navigate('/'),
      disabled: false,
      route: 'all'
    },
    {
      text: t('map'),
      icon: <MapIcon />,
      onClick: () => navigate('/map'),
      disabled: false,
      route: 'all'
    },
    {
      text: t('about'),
      icon: <InfoIcon />,
      onClick: () => navigate('/about-maphidro'),
      disabled: false,
      route: 'all'
    },
    {
      text: t('uxsurvey'),
      icon: <QuestionAnswerIcon />,
      onClick: () => navigate('/ux'),
      disabled: false,
      route: 'all'
    },

    {
      text: t('projects'),
      icon: <BookIcon />,
      disabled: true,
      route: 'map'
    },
    {
      text: t('timeline'),
      icon: <HistoryIcon />,
      disabled: true,
      route: 'map'
    },
    {
      text: t('download'),
      icon: <DownloadIcon />,
      disabled: true,
      route: 'map'
    },
    {
      text: t('select'),
      icon: <AddLocationAltIcon />,
      onClick: () => showSelectDialog(),
      disabled: false,
      route: 'map'
    },
    {
      text: t('filters'),
      icon: <FilterAltIcon />,
      disabled: true,
      route: 'map'
    },
    {
      text: t('results'),
      icon: <AutoAwesomeMotionIcon />,
      disabled: true,
      route: 'map'
    },
    {
      text: t('logout'),
      icon: <LogoutIcon />,
      onClick: () => handleLogout(),
      disabled: false,
      route: 'map'
    },
    {
      text: t('help'),
      icon: <HelpIcon />,
      onClick: () => showHelpDialog(),
      disabled: false,
      route: 'map'
    },
    {
      text: t('settings'),
      icon: <SettingsIcon />,
      onClick: () => showSettingsDialog(),
      disabled: false,
      route: 'map'
    }
  ];

  const itemsList = [
    {
      text: t('home'),
      icon: <HomeIcon />,
      onClick: () => navigate('/'),
      route: 'all'
    },
    {
      text: t('map'),
      icon: <MapIcon />,
      onClick: () => navigate('/map'),
      route: 'all'
    },
    {
      text: t('about'),
      icon: <InfoIcon />,
      onClick: () => navigate('/about-maphidro'),
      route: 'all'
    },
    {
      text: t('uxsurvey'),
      icon: <QuestionAnswerIcon />,
      onClick: () => navigate('/ux'),
      route: 'all'
    },

    {
      text: t('logout'),
      icon: <LogoutIcon />,
      onClick: () => handleLogout(),
      route: 'map'
    }
  ];

  const list = (anchor: Anchor) => (
    <>
      <List>
        <ListItem key={'Logout'} disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Starred'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'Starred'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Help'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={'Help'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Settings'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={'Projects'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={'Projects'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Timeline'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Timeline'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Download'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary={'Download'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={'Select'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddLocationAltIcon />
            </ListItemIcon>
            <ListItemText primary={'Select'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Filters'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FilterAltIcon />
            </ListItemIcon>
            <ListItemText primary={'Filters'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Results'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AutoAwesomeMotionIcon />
            </ListItemIcon>
            <ListItemText primary={'Results'} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <div>
      <Drawer anchor={'left'} open={appState.drawer} onClose={toggleDrawer('left', false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}>
          {location.pathname === '/map' ? (
            <List>
              {itemsListMap.map((item, index) => {
                const { text, icon, onClick, disabled } = item;

                return (
                  <ListItem button key={text} onClick={onClick} disabled={disabled}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <List>
              {itemsList.map((item, index) => {
                const { text, icon, onClick } = item;

                return (
                  <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
