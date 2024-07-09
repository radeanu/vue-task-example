export enum productTypeEnum {
  simple = 'simple',
  configurable = 'configurable'
}

export enum currencyEnum {
  USD = 'USD'
}

export enum configAttributeCode {
  color = 'color',
  size = 'size'
}

export type ConfigValueOption = {
  label: string;
  value_index: number;
  value: string;
};

export type ConfigurableColorOption = {
  label: string;
  attribute_id: number;
  attribute_code: configAttributeCode.color;
  values: ConfigValueOption[];
};

export type ConfigurableSizeOption = {
  id: number;
  label: string;
  position: number;
  attribute_id: number;
  attribute_code: configAttributeCode.size;
  values: ConfigValueOption[];
};

export type ConfigurableOption =
  | ConfigurableColorOption
  | ConfigurableSizeOption;

export type VariantAttribute = {
  code: configAttributeCode;
  value_index: number;
};

export type VariantProduct = {
  id: number;
  sku: string;
  image: string;
};

export type Variant = {
  attributes: VariantAttribute[];
  product: VariantProduct[];
};

export type Price = {
  currency: currencyEnum;
  value: number;
};

export type Brand = {
  id: number;
  title: string;
  sort: string;
  code: string;
};

export type Product = {
  id: number;
  sku: string;
  title: string;
  image: string;
  brand: number;
  regular_price: Price;
  type: productTypeEnum;
  configurable_options?: ConfigurableOption[];
  variants?: Variant[];
};
