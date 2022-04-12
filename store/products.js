import products from '../assets/level3/products.json';

export const state = () => ({
  products: [],
  productsToDisplay: []
});

export const getters = {
  GET_PRODUCTS: (state) => state.products,
  GET_PRODUCTS_TO_DISPLAY: (state) => state.productsToDisplay,
  GET_PRODUCT_BY_ID: (state) => (id) => state.products.find((p) => id === p.id)
};

export const mutations = {
  SET_PRODUCTS: (state, data) => (state.products = data),
  SET_PRODUCTS_TO_DISPLAY: (state, data) => (state.productsToDisplay = data),
  FILTER_PRODUCTS_BY_BRAND: (state, brandId) => {
    state.productsToDisplay = state.products.filter((p) => p.brand === brandId);
  },
  RESET_PRODUCTS_TO_DISPLAY: (state) => {
    const products = JSON.stringify(state.products);
    const productsToDisplay = JSON.stringify(state.productsToDisplay);

    if (products !== productsToDisplay) {
      state.productsToDisplay = JSON.parse(products);
    }
  }
};

export const actions = {
  FETCH_PRODUCTS(store) {
    store.commit('SET_PRODUCTS', products);
  }
};
