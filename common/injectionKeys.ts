import type { InjectionKey } from 'vue';
import type { Brand, ProductCart } from './types.ts';

export const brandsKey = Symbol() as InjectionKey<Ref<Brand[] | null>>;
export const cartKey = Symbol() as InjectionKey<Ref<ProductCart[] | null>>;
