export const state = () => ({
  cartProductIds: []
});

export const getters = {
  GET_ITEMS: (state) => state.cartProductIds,
  COUNT_ITEMS: (state) => state.cartProductIds.length
};

export const mutations = {
  ADD_ITEM_TO_CART: (state, itemId) => {
    state.cartProductIds.push({
      id: itemId,
      count: 1
    });
  },
  REMOVE_ITEM_FROM_CART: (state, itemId) => {
    state.cartProductIds = state.cartProductIds.filter((item) => {
      return item.id !== itemId;
    });
  },
  UPDATE_ITEM_COUNT: (state, { count, itemId }) => {
    state.cartProductIds.find((i) => i.id === itemId).count = count;
  }
};
