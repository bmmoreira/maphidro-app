import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../OffCanvas/DrawerToggleButton';
import LanguageSwitcher from "../../utils/LanguageSwitcher";
import Button from './Button';

interface ToolBarProps {
    satClickHandler(): void;
    localClickHandler(): void;
    drawerClickHandler(): void;
    widthValue: number;
}

const Toolbar = function(props: ToolBarProps) {
    return (
    
    <header className="toolbar">
        <nav className="toolbar-navigation">
            <div className="toolbar-accordion">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar-logo">
                            {
                                (props.widthValue <= 485) ? '' :<a href='/'>MapHidro</a>
                            }
            </div>
            <div className="spacer" />
            <div className="toolbar-nav-items">
                <ul>
                    <li><LanguageSwitcher  /></li>
                    <li><Button 
                            imageUrl={process.env.PUBLIC_URL + '/images/buttons/icon_gauge.png'} 
                            text={
                                (props.widthValue <= 485) ? '' :'IN-SITU'
                            }
                            clickHandler={props.localClickHandler}
                            aria-label="IN-SITU"
                        />
                    </li>
                    <li><Button 
                        imageUrl={process.env.PUBLIC_URL + '/images/buttons/icon_satellite.png'} 
                        text={
                            (props.widthValue <= 485) ? '' :'IMERGE'
                        }
                        clickHandler={props.satClickHandler}
                        aria-label="IN-SITU"
                        />
                    </li>

                             </ul>
            </div>
        </nav>
    </header>


);
}

export default Toolbar;