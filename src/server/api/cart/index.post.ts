import { getCartRepo } from '@/server/useCartRepo.ts';

import { type ProductCart } from '@/common/types';

const cartRepo = getCartRepo();

export default defineEventHandler(async (event) => {
  const cartItem = await readBody<ProductCart>(event);
  cartRepo.addToCart(cartItem.sku, cartItem.count);

  return {};
});
