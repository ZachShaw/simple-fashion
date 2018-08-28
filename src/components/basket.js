import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../redux/basket.js';

import '../styles/components/basket.scss';

class Basket extends Component {

    static propTypes = {
        basket: PropTypes.object.isRequired,
        onRemoveItem: PropTypes.func.isRequired,
        onAddItem: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
          toggleBasket: false,
        };

        this.onToggleBasket = this.onToggleBasket.bind(this);
        this.numberOfItems = this.numberOfItems.bind(this);
    }

    numberOfItems(items) {
      let count = 0;
      items.forEach((item) => {
        count = item.quantity + count;
      });
      return count;
    }

    onToggleBasket() {
      this.setState((state) => {
        return {
          toggleBasket: !state.toggleBasket
        };
      });
    }

    render() {   
      const { basket, onRemoveItem, onAddItem } = this.props;
      const { toggleBasket } = this.state;
      const { items } = basket;
      const basketCount = this.numberOfItems(items);

      return (
          <div className="basket--container">
            <div className="basket--icon" onClick={() => this.onToggleBasket()}><i className="fa fa-shopping-basket" aria-hidden="true"></i></div>
            { basketCount > 0 && 
              <div className="basket--count">
                {basketCount}
              </div> 
            }
            <div className={`${toggleBasket ? 'basket--contents-active' : 'basket--contents-inactive'} basket--contents`}>
              { items.length > 0 && items.map((item) => {
                return (
                  <div key={item.code} className="basket--item">
                  <img 
                    alt="item-img" 
                    src={item.image}
                  />
                    <div className="basket--item--details">
                      <p>{item.name} ({item.code})</p>
                    </div>
                    <div className="basket--item--price">
                      <p>£{item.price / 100}</p>
                    </div>
                    <div className="basket--item--quantity">
                      <button onClick={() => onRemoveItem(item)}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAddItem(item)}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                    </div>
                  </div>
                );
              })}
              <div className="basket--footer">
                <button>Checkout</button>
                <div className="basket--total">
                  <div className="basket--total--sub">
                    <p>Delivery Fee: £{basket.delivery}</p>
                    <p>Basket Total: £{basket.itemTotal}</p>
                  </div>
                  <div className="basket--total--sum">
                    <p>Total: £{basket.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
    };
  };
  
const mapDispatchToProps = (dispatch) => ({
    onAddItem: (item) => dispatch(addItem(item)),
    onRemoveItem: (item) => dispatch(removeItem(item))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Basket);