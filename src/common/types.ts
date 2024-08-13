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

export type AppMenu = {
	code: string;
	title: string;
	link: string;
};

export type ConfigValueOption = {
	_exists?: boolean;
	_selected?: boolean;
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

export type ProductVariant = {
	id: number;
	sku: string;
	image: string;
};

export type Variant = {
	attributes: VariantAttribute[];
	product: ProductVariant;
};

export type Price = {
	currency: currencyEnum;
	value: number;
};

export type ViewPrice = {
	val: number;
	label: string;
};

export type Brand = {
	id: number;
	title: string;
	sort: string;
	code: string;
};

export type BaseProduct = {
	id: number;
	sku: string;
	title: string;
	image: string;
	brand: number;
	regular_price: Price;
	_brand_title?: string;
	_in_cart?: boolean;
};

export type SimpleProduct = BaseProduct & {
	type: productTypeEnum.simple;
};

export type ConfigurableProduct = BaseProduct & {
	type: productTypeEnum.configurable;
	configurable_options: ConfigurableOption[];
	variants: Variant[];
};

export type Product = SimpleProduct | ConfigurableProduct;

export type ProductCart = {
	sku: string;
	count: number;
};

export type CartItem = ProductCart & {
	product?: Product;
	brand?: Brand;
};
