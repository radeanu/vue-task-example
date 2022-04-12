import brands from '../assets/brands.json';

export const state = () => ({
  brands: []
});

export const getters = {
  GET_BRANDS: (state) => state.brands
};

export const mutations = {
  SET_BRANDS: (state, data) => (state.brands = data)
};

export const actions = {
  FETCH_BRANDS(store) {
    store.commit('SET_BRANDS', brands);
  }
};
