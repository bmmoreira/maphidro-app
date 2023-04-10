import React from 'react';
import MaphidroIcon from "./maphidro-icon";

function MapLoadingHolder({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <MaphidroIcon className="icon" />
      <h1>Initializing the map</h1>
      <div className="icon-attribute">
       Dissertation project for MSC in Informatics Engineering and Web Technology UAB/UTAD
        
      </div>
    </div>
  );
}

export default MapLoadingHolder;