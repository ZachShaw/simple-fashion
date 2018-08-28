import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInventory, FETCH_INVENTORY } from '../redux/inventory.js';
import { addItem } from '../redux/basket.js';
import Item from '../components/item.js';

import '../styles/views/home.scss';

class HomeView extends Component {

    static propTypes = {
        fetchLoading: PropTypes.bool,
        fetchErrored: PropTypes.bool,
        onFetchInventory: PropTypes.func.isRequired,
        inventory: PropTypes.array.isRequired,
        onAddItem: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { onFetchInventory } = this.props;
        onFetchInventory();
    }

    render() {
        const { inventory, onAddItem, fetchLoading, fetchErrored } = this.props;
        
        return (
            <div className="home--container">
                <div className="home--header">
                    <h4>Browse Clothes</h4>
                </div>
                { fetchLoading && <div className="home--loading-error">
                    <i className="fa fa-spinner" aria-hidden="true"></i>
                </div> }
                { fetchErrored && <div className="home--loading-error">
                    Error fetching data
                </div> }
                { !fetchLoading && !fetchErrored && <div className="item--container">
                    { inventory && inventory.map((item) => 
                        <Item key={item.code} {...item} callback={() => onAddItem(item)} /> 
                    )}
                </div> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let fetchLoading = state.network.loading[FETCH_INVENTORY];
    let fetchErrored = state.network.errored[FETCH_INVENTORY];

    return {
        fetchLoading,
        fetchErrored,
        inventory: state.inventory.data,
    };
  };
  
const mapDispatchToProps = (dispatch) => ({
    onFetchInventory: () => dispatch(fetchInventory()),
    onAddItem: (item) => dispatch(addItem(item))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);