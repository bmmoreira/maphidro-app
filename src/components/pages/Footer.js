import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useWindowDimensions from '../Utils/useWindowDimensions.js';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { styled, alpha } from '@mui/material/styles';

function Footer() {
  const [value, setValue] = React.useState(0);
  const { height, width } = useWindowDimensions();
  const location = useLocation();

  const navigate = useNavigate();

  function BottomNav() {
    return (
      <Box sx={{ width: '100%', zIndex: 9999, bottom: '0px', position: 'relative' }}>
        <BottomNavigation
          sx={{
            backgroundColor: '#1976d2',
            height: '70px',
            color: 'white',
            zIndex: 9999
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction
            label="Home"
            icon={
              <HomeIcon
                sx={{
                  color: 'white'
                }}
              />
            }
            onClick={() => navigate('/')}
            sx={{
              color: '#ccc',
              '&& .Mui-selected': {
                color: 'white'
              }
            }}
          />
          <BottomNavigationAction
            label="Map"
            icon={
              <MapIcon
                sx={{
                  color: 'white'
                }}
              />
            }
            onClick={() => navigate('/map')}
            sx={{
              color: '#ccc',
              '&& .Mui-selected': {
                color: 'white'
              }
            }}
          />
          <BottomNavigationAction
            label="About"
            icon={
              <InfoIcon
                sx={{
                  color: 'white'
                }}
              />
            }
            onClick={() => navigate('/about-maphidro')}
            sx={{
              color: '#ccc',
              '&& .Mui-selected': {
                color: 'white'
              }
            }}
          />
          <BottomNavigationAction
            label="UX"
            icon={
              <QuestionAnswerIcon
                sx={{
                  color: 'white'
                }}
              />
            }
            onClick={() => navigate('/ux')}
            sx={{
              color: '#ccc',
              '&& .Mui-selected': {
                color: 'white'
              }
            }}
          />
        </BottomNavigation>
      </Box>
    );
  }

  return (
    <>
      {width < 600 ? (
        location.pathname === '/' ||
        location.pathname === '/about-maphidro' ||
        location.pathname === '/ux' ? (
          <BottomNav />
        ) : (
          ''
        )
      ) : (
        <footer
          className="footer border-top text-center small text-muted p-2 my-0"
          style={{ backgroundColor: '#b3e5f7' }}>
          <div style={{ color: '#595f88' }}>
            <Link
              to="/"
              className="mx-1"
              style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
              Home
            </Link>{' '}
            |{' '}
            <Link
              className="mx-1"
              to="/map"
              style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
              Map
            </Link>{' '}
            |{' '}
            <Link
              className="mx-1"
              to="/about-maphidro"
              style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
              About MapHidro
            </Link>{' '}
            |{' '}
            <Link
              className="mx-1"
              to="/ux"
              style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
              UX
            </Link>{' '}
            <span>
              {' '}
              - Copyright &copy; {new Date().getFullYear()} MapHidro . All rights reserved.
            </span>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
