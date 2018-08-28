import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/item.scss';

const Item = (props) => {
  const { name, image, price, callback } = props;

  return (
      <div className="item--wrapper">
        <img 
          alt="item-img" 
          src={image}
        />
        <div className="item--details">
          <div className="item--info">
            <p>{name}</p>
            <p>£{price / 100}</p>
          </div>
          <div className="item--purchase">
            <button onClick={() => callback()}>Buy <i className="fa fa-shopping-basket" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
  );
};

Item.defaultProps = {
  callback: () => {},
};

Item.propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    callback: PropTypes.func,
};

export default Item;