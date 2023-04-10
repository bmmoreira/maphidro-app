import React from "react";
import { useTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./riverpopup.css";



const RiverPopup = ({ info  }) => {
  const { t } = useTranslation();
  
  return (
    <>      
      <Card
          bg={'primary'}
          key={'primary'}
          text={'light'}
          style={{ width: '18rem', maginBottom: '-50px' }}
          
        >
          <Card.Header>River</Card.Header>
          <Card.Body>
            <Card.Title>{info.riverName}</Card.Title>
            <Card.Text>
            <span className="font-link">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            </Card.Text>
          </Card.Body>
        </Card>
    </>
  );
};
export default RiverPopup;
