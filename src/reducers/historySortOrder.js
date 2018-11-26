import { HISTORY_SORT_ORDERS } from "../actions";

const historySortOrder = (state = HISTORY_SORT_ORDERS.ASC, action) => {
  switch (action.type) {
    case 'SET_HISTORY_SORT_ORDER':
      return action.order;
    default:
      return state;
  }
};

export default historySortOrder;
