import React from 'react';
import './DrawerToggleButton.css';

type ButtonProps = {
    click(): void;
}

const drawerToggleButton = (props: ButtonProps) => (
    <button className="toggle-button" onClick={props.click} aria-label="Menu">
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
    </button>
);

export default drawerToggleButton;