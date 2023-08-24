import React, { useContext } from 'react';
import Page from './Page';
import StateContext from '../../StateContext';

function Home() {
  const appState = useContext(StateContext);

  return (
    <Page title="Your Map Statistics">
      <h2 className="text-center" style={{ marginTop: '20px' }}>
        <strong>{appState.user.username}</strong>, this is your landing page.
      </h2>
      <p className="lead text-muted text-center">
        We will customize this page with map statistics in the future.
      </p>
    </Page>
  );
}

export default Home;
