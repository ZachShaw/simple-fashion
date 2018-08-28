import Api from '../api.js';
import { handleActions } from 'redux-actions';
import { fetchActions, fetchSuccess } from './utils.js';

export const FETCH_INVENTORY = `${__APP_NAME__}/inventory/fetch`;
const fetchInventoryActions = fetchActions(FETCH_INVENTORY);

export function fetchInventory() {
    return (dispatch) => {
        dispatch(fetchInventoryActions.started());

        return Api.get(`/bins/zfebv`)
            .catch((err) => {
                dispatch(fetchInventoryActions.error(err));
                return Promise.reject(err);
            })
            .then((res) => dispatch(fetchInventoryActions.success(res.data)));
    };
  }

const initialState = {
  data: []
};

export default handleActions({
  [fetchSuccess(FETCH_INVENTORY)]: (state, action) => {
      return {
          ...state,
          data: action.payload
      };
  },
}, initialState);