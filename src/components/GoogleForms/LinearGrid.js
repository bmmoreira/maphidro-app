import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLinearInput } from 'react-google-forms-hooks';

const Container = styled.div`
  display: flex;
  align-items: center;

  & * {
    margin: 0 3px;
  }
  margin-bottom 10px;
  input[type="radio"] {
    -ms-transform: scale(0.8); /* IE 9 */
    -webkit-transform: scale(0.8); /* Chrome, Safari, Opera */
    transform: scale(0.8);
    
  }
`;

const ErrorLabel = styled.span`
  color: red;
`;

export default function ShortAnswerInput({ id }) {
  const { options, legend, error } = useLinearInput(id);

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          padding: 0,
          backgroundColor: '#0f9bd9'
        }}>
        <Grid item xs={3.2}>
          <Typography sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            {legend.labelFirst}
          </Typography>
        </Grid>

        {options.map((o) => {
          return (
            <Grid
              item
              xs={0.8}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <input key={o.id} type="radio" {...o.registerOption()} />
            </Grid>
          );
        })}
        <Grid item xs={3.2}>
          <Typography sx={{ padding: '5px 0 5px 10px', color: 'white' }}>
            {legend.labelLast}
          </Typography>
        </Grid>
      </Grid>
      <ErrorLabel>{error && 'This field is required'}</ErrorLabel>
    </>
  );
}
