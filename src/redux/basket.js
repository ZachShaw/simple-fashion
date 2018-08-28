import { handleActions, createAction } from 'redux-actions';

export const ADD_ITEM = `${__APP_NAME__}/basket/add`;
export const REMOVE_ITEM = `${__APP_NAME__}/basket/remove`;
export const CALCULATE_TOTAL = `${__APP_NAME__}/basket/calculate`;

const deliveryFee = 4.95;

export function addItem(item) {
  return createAction(ADD_ITEM)(item);
}

export function removeItem(item) {
  return createAction(REMOVE_ITEM)(item);
}

export function calculateTotal(state) {
  const { items } = state;
    let total = 0;

    items.forEach((item) => {
      total = (total + (item.price * item.quantity) / 100);
    });

    return total;
}

const initialState = {
  items: [],
  itemTotal: 0,
  delivery: deliveryFee,
  total: 0,
};

export default handleActions({
  [ADD_ITEM]: (state, action) => {
    const { items } = state;
    const addedItem = action.payload;
    const itemIndex = items.findIndex(item => item.code == addedItem.code);

    if (itemIndex === -1) {
      items.push({ ...addedItem, quantity: 1 });
    } else {
      items[itemIndex].quantity = items[itemIndex].quantity + 1;
    }

    const itemTotal = calculateTotal(state);

    const totalWithFee = itemTotal + deliveryFee;

    return {
        ...state,
        items,
        itemTotal: itemTotal.toFixed(2),
        delivery: itemTotal >= 50 ? 0 : 4.95,
        total: itemTotal >= 50 ? itemTotal.toFixed(2) : totalWithFee.toFixed(2)
    };
  },
  [REMOVE_ITEM]: (state, action) => {
    const { items } = state;
    const removedItem = action.payload;
    const itemIndex = items.findIndex(item => item.code == removedItem.code);
    const itemInBasket = items[itemIndex];

    if (itemInBasket.quantity > 1) {
      itemInBasket.quantity = itemInBasket.quantity - 1;
    } else {
      items.splice(itemIndex, 1);
    }

    const itemTotal = calculateTotal(state);

    const totalWithFee = itemTotal + deliveryFee;

    return {
        ...state,
        items,
        itemTotal: itemTotal.toFixed(2),
        delivery: itemTotal >= 50 ? 0 : deliveryFee,
        total: itemTotal >= 50 ? itemTotal.toFixed(2) : totalWithFee.toFixed(2)
    };
  }
}, initialState);