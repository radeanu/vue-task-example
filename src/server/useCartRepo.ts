import { type ProductCart } from '@/common/types';

let cartRepo: ReturnType<typeof useCartRepo> | undefined;

function useCartRepo() {
  const cart: ProductCart[] = [];

  function getCart() {
    return cart;
  }

  function addToCart(sku: string, count: number) {
    const itemIndex = cart.findIndex((i) => i.sku === sku);

    if (itemIndex === -1) {
      return cart.push({ sku, count });
    }

    return (cart[itemIndex].count += count);
  }

  return {
    getCart,
    addToCart
  };
}

export function getCartRepo() {
  if (cartRepo) return cartRepo;

  cartRepo = useCartRepo();

  return cartRepo;
}
