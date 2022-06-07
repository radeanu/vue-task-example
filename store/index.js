export const state = () => ({});

export const getters = {};

export const actions = {
  async nuxtServerInit(ctx) {
    await ctx.dispatch('brands/FETCH_BRANDS');
    await ctx.dispatch('products/FETCH_PRODUCTS');
    ctx.commit('products/RESET_PRODUCTS_TO_DISPLAY');
  }
};
