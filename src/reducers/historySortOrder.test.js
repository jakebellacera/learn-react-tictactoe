import reducer from './historySortOrder';
import { HISTORY_SORT_ORDERS } from "../actions";

describe('historySortOrder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(HISTORY_SORT_ORDERS.ASC);
  });

  it('should handle SET_HISTORY_SORT_ORDER', () => {
    expect(
      reducer(undefined, {
        type: 'SET_HISTORY_SORT_ORDER',
        order: HISTORY_SORT_ORDERS.DESC
      })
    ).toEqual(HISTORY_SORT_ORDERS.DESC);

    // we don't validate at the reducer level
    expect(
      reducer(undefined, {
        type: 'SET_HISTORY_SORT_ORDER',
        order: 'somethingelse_1234'
      })
    ).toEqual('somethingelse_1234');
  });
});
