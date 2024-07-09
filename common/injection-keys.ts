import type { InjectionKey } from 'vue';
import type { Brand } from './types.ts';

export const brandsKey = Symbol() as InjectionKey<Brand[]>;
