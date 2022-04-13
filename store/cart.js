export const state = () => ({
  cartProducts: []
});

export const getters = {
  GET_ITEMS: (state) => state.cartProducts,
  COUNT_ITEMS: (state) => state.cartProducts.length
};

export const mutations = {
  ADD_ITEM_TO_CART: (state, item) => {
    state.cartProducts.push({
      ...item,
      count: 1
    });
  },
  REMOVE_ITEM_FROM_CART: (state, index) => {
    state.cartProducts.splice(index, 1);
  },
  UPDATE_ITEM_COUNT: (state, { count, itemId }) => {
    state.cartProducts.find((i) => i.id === itemId).count = count;
  }
};
