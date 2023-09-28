import React, { useContext } from 'react';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

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
import { Link, useNavigate } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();

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

  const itemsList = [
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => handleLogout()
    },
    {
      text: 'Help',
      icon: <HelpIcon />
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />
    },
    {
      text: 'Projects',
      icon: <BookIcon />
    },
    {
      text: 'Timeline',
      icon: <HistoryIcon />
    },
    {
      text: 'Download',
      icon: <DownloadIcon />
    },
    {
      text: 'Select',
      icon: <AddLocationAltIcon />
    },
    {
      text: 'Filters',
      icon: <FilterAltIcon />
    },
    {
      text: 'Results',
      icon: <AutoAwesomeMotionIcon />
    },
    {
      text: 'Home',
      icon: <HomeIcon />,
      onClick: () => navigate('/')
    },
    {
      text: 'Map',
      icon: <MapIcon />,
      onClick: () => navigate('/map')
    },
    {
      text: 'About',
      icon: <InfoIcon />,
      onClick: () => navigate('/about-maphidro')
    },
    {
      text: 'UX',
      icon: <QuestionAnswerIcon />,
      onClick: () => navigate('/ux')
    }
  ];

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
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
    </Box>
  );

  return (
    <div>
      <Drawer anchor={'left'} open={appState.drawer} onClose={toggleDrawer('left', false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}>
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
        </Box>
      </Drawer>
    </div>
  );
}
