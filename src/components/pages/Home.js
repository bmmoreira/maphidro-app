import React, { useContext } from 'react';
import Page from './Page';
import StateContext from '../../StateContext';

function Home() {
  const appState = useContext(StateContext);

  return (
    <Page title="Your Feed">
      <h2 className="text-center">
        <strong>{appState.user.username}</strong>, this is your landing page.
      </h2>
      <p className="lead text-muted text-center">
        We will customize this page with map statistics in the future.
      </p>
    </Page>
  );
}

export default Home;
