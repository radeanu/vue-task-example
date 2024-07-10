import type { ProductCart } from '@/common/types.ts';

const STORAGE_KEY = 'CART';

export default function useProductCartStorage() {
  function getCartProducts(): ProductCart[] {
    const storageItem = localStorage.getItem(STORAGE_KEY);
    if (!storageItem) return [];

    try {
      const items = JSON.parse(storageItem);

      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function addProduct(product: ProductCart) {
    const cartItems = getCartProducts();
    localStorage.setItem('CART', JSON.stringify([...cartItems, product]));
  }

  function removeProduct(sku: string) {
    const cartItems = getCartProducts();
    const newItems = cartItems.filter((p) => p.sku === sku);
    localStorage.setItem('CART', JSON.stringify(newItems));
  }

  return {
    addProduct,
    removeProduct,
    getCartProducts
  };
}
