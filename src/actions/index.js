export const playMove = (square, index) => ({
  type: 'PLAY_MOVE',
  square,
  index
});

export const viewMove = (index) => ({
  type: 'VIEW_MOVE',
  index
});

export const setHistorySortOrder = (order) => ({
  type: 'SET_HISTORY_SORT_ORDER',
  order
});

export const HISTORY_SORT_ORDERS = {
  ASC: "ASC",
  DESC: "DESC"
};
