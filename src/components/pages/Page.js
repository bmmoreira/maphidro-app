/** @format */

import React, { useEffect } from 'react';
import Container from './Container';
import Footer from './Footer';

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | MapHidro`;
    window.scrollTo(0, 0);
  }, []);
  return <Container wide={props.wide}>{props.children}</Container>;
}

export default Page;
