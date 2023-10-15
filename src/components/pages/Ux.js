import React, { useState } from 'react';
import { GoogleFormProvider, useGoogleForm } from 'react-google-forms-hooks';
import styled from 'styled-components';
import RadioInput from '../GoogleForms/RadioInput';
import LinearGrid from '../GoogleForms/LinearGrid';
import ShortAnswerInput from '../GoogleForms/ShortAnswerInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Page from './Page';
import { BootstrapButton } from '../Utils/sytles';
import { useTranslation } from 'react-i18next';

import form from './form.json';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 0;
`;

const QuestionContainer = styled.div`
  margin-bottom: 1px;
`;

const QuestionLabel = styled.h3`
  margin-bottom: 10px;
`;

const Questions = () => {
  return (
    <div>
      {form.fields.map((field) => {
        const { id } = field;

        let questionInput = null;
        switch (field.type) {
          case 'RADIO':
            questionInput = <RadioInput id={id} />;
            break;
          case 'LINEAR':
            questionInput = <LinearGrid id={id} />;
            break;
          case 'SHORT_ANSWER':
            questionInput = <ShortAnswerInput id={id} />;
            break;
          default:
            return null;
        }

        if (!questionInput) {
          return null;
        }

        return (
          <QuestionContainer key={id}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                padding: '0px 0 0px 10px',
                color: 'gray',
                display: 'flex',
                justifyContent: 'center'
              }}>
              {field.label}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                padding: '0px 0 0px 10px',
                color: 'gray',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '0.875rem'
              }}>
              {questionInput}
            </Typography>
          </QuestionContainer>
        );
      })}
    </div>
  );
};

export default function UX(props) {
  const { t } = useTranslation();

  const [sent, setSent] = useState(false);
  const methods = useGoogleForm({ form });
  const onSubmit = async (data) => {
    setSent(true);
    await methods.submitToGoogleForms(data);
  };

  return (
    <Page title="UX Questionary">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            padding: '25px 0 0px 10px',
            color: 'gray',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>
          {t('uxpage_title')}
        </Typography>
        {!sent && (
          <Typography
            variant="h6"
            component="h2"
            sx={{ padding: '25px 0 0px 10px', color: 'gray', fontSize: '0.875rem' }}>
            {t('survey_text01')}
          </Typography>
        )}
        {!sent && (
          <GoogleFormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Questions />
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                <BootstrapButton
                  variant="contained"
                  aria-label="station name"
                  color="primary"
                  type="submit"
                  sx={{ width: '100px' }}>
                  {t('submit')}
                </BootstrapButton>
              </Box>
            </Form>
          </GoogleFormProvider>
        )}
        {sent && (
          <Typography
            variant="h6"
            component="h2"
            sx={{
              padding: '25px 0 0px 10px',
              color: 'gray',
              display: 'flex',
              justifyContent: 'center'
            }}>
            {t('thanks_response')}
          </Typography>
        )}
      </Box>
    </Page>
  );
}
