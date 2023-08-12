import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer
        className="border-top text-center small text-muted p-2 my-0"
        style={{ backgroundColor: '#b3e5f7' }}>
        <div style={{ color: '#595f88' }}>
          <Link
            to="/"
            className="mx-1"
            style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
            Home
          </Link>{' '}
          |{' '}
          <Link
            className="mx-1"
            to="/map"
            style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
            Map
          </Link>{' '}
          |{' '}
          <Link
            className="mx-1"
            to="/about-maphidro"
            style={{ textDecoration: 'none', fontWeight: '600', color: '#595f88' }}>
            About MapHidro
          </Link>{' '}
          <span>
            {' '}
            - Copyright &copy; {new Date().getFullYear()} MapHidro . All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
