/** @format */

import React, { useEffect } from 'react';

function Container(props) {
  //container container--narrow py-md-5
  return (
    <div className={'container py-md-5 page ' + (props.wide ? '' : 'container--narrow')}>
      {props.children}
    </div>
  );
}

export default Container;
