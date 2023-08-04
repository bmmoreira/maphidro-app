import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="border-top text-center small text-muted pt-3 my-0">
        <div>
          <Link to="/" className="mx-1">
            Home
          </Link>{' '}
          |{' '}
          <Link className="mx-1" to="/map">
            Map
          </Link>{' '}
          |{' '}
          <Link className="mx-1" to="/about-maphidro">
            About MapHidro
          </Link>{' '}
          <span>
            {' '}
            - Copyright &copy; {new Date().getFullYear()}{' '}
            <a href="/" className="text-muted">
              MapHidro
            </a>
            . All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
