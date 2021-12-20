export interface ItemSlider {
  title: string;
  description: string;
  img: string;
  color: string;
  path: string;
}

export interface IPolicyCard {
  name: string;
  description: string;
  icon: string;
}

export interface IProductCard {
  img01: string;
  img02: string;
  name: string;
  price: number;
  slug: string;
}

export interface IItemFilter {
  display: string;
  categorySlug?: string;
  color?: string;
  size?: string;
}

export interface IProducts {
  title: string;
  price: string;
  image01: string;
  image02: string;
  categorySlug: string;
  colors: string[];
  slug: string;
  size: string[];
  description: string;
}
