/** @format */

import React from 'react';
import Page from './Page';
import { Link } from 'react-router-dom';

function MapGuest() {
  return (
    <Page title="MapHidro">
      <div className="text-center">
        <h2 style={{ marginTop: '20px' }}>Please register to access the map functionality.</h2>
        <p className="lead text-muted">
          You can visit the <Link to="/">Homepage</Link> to sign up.
        </p>
      </div>
    </Page>
  );
}

export default MapGuest;
