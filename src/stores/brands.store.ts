import { defineStore } from 'pinia';
import * as services from '~/common/services';
import type { Brand } from '~/common/types';

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref<Brand[]>([]);

  async function fetchBrands() {
    const res = await services.fetchBrands();
    brands.value = res;
  }

  return { brands, fetchBrands };
});
