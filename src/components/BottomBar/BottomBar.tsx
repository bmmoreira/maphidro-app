import React from 'react'
import { useTranslation } from "react-i18next";
import "./bottombar.css";

interface BbarProps {
  toggleCl?(): void;
  toggleLg?(): void;
  toggleLy?(): void;
  toggleSb?(): void;
  onHide?(): void;
}

function BottomBar(props: BbarProps) {
    const { t } = useTranslation();

  return (
    <div id="options" className="bottom-bar">
    <button id='clusterLayer' onClick={props.toggleCl} className="bar-buttons"   type="button"><img src={`./images/buttons/b-stations-${t('img')}.png`} height ="75" width="75" alt="Stations" /></button>
    <button id='satLayer' onClick={props.toggleLg} className="bar-buttons" type="button"><img src={`./images/buttons/b-satellites-${t('img')}.png`} height ="75" width="75" alt="Precipitation"/></button>
    <button id='basinLayer' onClick={props.toggleLy} className="bar-buttons" type="button"><img src={`./images/buttons/b-layers-${t('img')}.png`} height ="75" width="75" alt="Layers"/></button>
    <button id='searchLayer' onClick={props.toggleSb} className="bar-buttons" type="button"><img src={`./images/buttons/b-search-${t('img')}.png`} height ="75" width="75" alt="Search"/></button>
    <button id='closeBar' onClick={props.onHide} className="bar-buttons" type="button"><img src="./images/buttons/b-close.png" height ="75" width="30" alt="Close"/></button>
  </div>
  )
}

export default BottomBar