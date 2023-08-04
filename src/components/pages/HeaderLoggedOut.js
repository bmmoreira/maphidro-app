import React, { useContext, useState } from 'react';
import Axios from 'axios';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { loginButtom } from '../Utils/constants.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input, { InputProps } from '@mui/base/Input';
import { styled } from '@mui/system';

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // get token from db if succefully logged
      const response = await Axios.post('https://mh-api.maphidro.com/login', {
        username,
        password
      });
      if (response.data) {
        console.log(response.data);
        // save values from response to local storage to remember user in the web browser's local storage, so that way they persist, or we can access them later
        appDispatch({ type: 'login', data: response.data });
        appDispatch({
          type: 'flashMessages',
          value: 'You have successfully logged in'
        });
        navigate(`/map`);
      } else {
        console.log('incorrect username /password');
        appDispatch({
          type: 'flashMessages',
          value: 'Invalid username / password. '
        });
      }
    } catch (error) {
      console.log('there was a problem in log in');
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ backgroundColor: '#007bff' }}>
        <h4 style={{ margin: '0px 30px 0px 0px' }}>
          <Link to={`/`} className="text-white" style={{ textDecoration: 'none' }}>
            <img src="assets/mh_logo.png" alt="maphidro logo" />
            MapHidro
          </Link>
        </h4>
        <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
          <div className="row align-items-center">
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <CustomInput
                aria-label="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                name="username"
                type="text"
              />
            </div>
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <CustomInput
                aria-label="username"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
              />
            </div>
            <div className="col-md-auto">
              <Button
                aria-label="logout"
                endIcon={<PersonIcon />}
                color="primary"
                type="submit"
                sx={{
                  ...loginButtom,
                  marginLeft: '20px',
                  marginBottom: '3px',
                  backgroundColor: '#198754',
                  '&:hover': {
                    backgroundColor: '#146c43',
                    borderColor: '#0677b2',
                    boxShadow: 'none'
                  }
                }}>
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default HeaderLoggedOut;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5'
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027'
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 300px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 4px 12px;
  margin: 10px 10px 10px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
