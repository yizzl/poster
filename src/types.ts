export type Theme = 'dark' | 'light';

export type ProductLayout = 'single-left' | 'single-right' | 'grid-2x2' | 'multi';

export interface Product {
  id: string;
  number: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  images: string[];
  layout: ProductLayout;
  tag: string;
}

export interface PosterState {
  // 主题
  theme: Theme;
  accentColor: string;

  // 主视觉区
  mainImage: string | null;
  dateText: string;
  locationText: string;
  sideVerticalText: string;
  authorText: string;
  showAuthor: boolean;

  // 标题区
  mainTitle: string;
  englishTitle: string;
  boothNumber: string;
  sectionTitle: string;
  slogan: string;

  // 字体
  titleFont: string;
  bodyFont: string;

  // 装饰
  dividerStyle: string;
  numberStyle: string;
  showBackgroundDecoration: boolean;

  // 制品
  products: Product[];

  // 分区标签（浅色主题用）
  sectionLabels: string[];
}
