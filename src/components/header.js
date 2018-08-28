import React from 'react';
import '../styles/components/header.scss';
import Basket from '../components/basket.js';

const Header = () => {
    return (
        <div className="header--container">
          <h4>SIMPLE FASHION</h4>
          <Basket />
        </div>
    );
};

export default Header;