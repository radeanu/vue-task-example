import * as services from '@/common/services';
import type { ProductCart, Brand } from '@/common/types';

export const useCartState = () => {
  const cart = useState<ProductCart[]>('cart', () => []);

  const cartCount = computed(() => cart.value.length);

  async function fetchCart() {
    cart.value = await services.fetchCart();
  }

  async function addToCart(item: ProductCart) {
    await services.addToCart(item);
    await fetchCart();
  }

  return { cart, fetchCart, addToCart, cartCount };
};

export const useBrandsState = () => {
  const brands = useState<Brand[]>('brands', () => []);

  async function fetchBrands() {
    brands.value = await services.fetchBrands();
  }

  return { brands, fetchBrands };
};
