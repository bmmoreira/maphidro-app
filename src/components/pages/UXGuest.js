/** @format */

import React, { useEffect } from 'react';
import Page from './Page';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <Page title="User Experience Avaliation">
      <h2 style={{ marginTop: '20px' }}>User Experience Avaliation</h2>
      <p className="lead text-muted">
        Usability and User Experience are important properties for improving products.Please Login
        for User Avaliation Questionary.
      </p>
      <p className="lead text-muted">
        For the User Experience evaluation of this portal, the UEQ methodology was used, which
        allows a quick evaluation of the user experience for any interactive product. The
        questionnaire scales are designed to cover a comprehensive impression of User Experience.
        The questionnaire format supports the user a response to immediately express feelings,
        impressions and attitudes that arise when they use a product. More details on the technique
        can be found at
        <a href="https://www.researchgate.net/publication/235850976_Efficient_Measurement_of_the_User_Experience_of_Interactive_Products_How_to_use_the_User_Experience_Questionnaire_UEQ_Example_Spanish_Language_Version">
          (Rauschenberger, Maria, et al.,2013)
        </a>
      </p>
    </Page>
  );
}

export default About;
