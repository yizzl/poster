import type { PosterState, Product } from './types';

export const FONT_OPTIONS = [
  { value: "'Noto Serif SC', serif", label: '思源宋体' },
  { value: "'Noto Sans SC', sans-serif", label: '思源黑体' },
  { value: "'ZCOOL XiaoWei', serif", label: '站酷小薇' },
  { value: "'Ma Shan Zheng', cursive", label: '马善政体' },
  { value: "'ZCOOL KuaiLe', cursive", label: '站酷快乐体' },
  { value: "'Long Cang', cursive", label: '龙藏体' },
  { value: "'Playfair Display', serif", label: 'Playfair' },
  { value: "'Bebas Neue', sans-serif", label: 'Bebas Neue' },
];

export const COLOR_OPTIONS = [
  { value: '#c0392b', label: '深红' },
  { value: '#e74c3c', label: '亮红' },
  { value: '#8e44ad', label: '紫色' },
  { value: '#2980b9', label: '蓝色' },
  { value: '#16a085', label: '青色' },
  { value: '#f39c12', label: '橙色' },
  { value: '#d4af37', label: '金色' },
  { value: '#e91e63', label: '粉色' },
  { value: '#2c3e50', label: '深蓝灰' },
  { value: '#27ae60', label: '绿色' },
];

export const DIVIDER_STYLES = [
  { value: 'thin', label: '细线' },
  { value: 'thick', label: '粗线' },
  { value: 'decorated', label: '装饰线' },
  { value: 'double', label: '双线' },
  { value: 'none', label: '无' },
];

export const NUMBER_STYLES = [
  { value: 'serif', label: '衬线数字' },
  { value: 'sans', label: '无衬线数字' },
  { value: 'mono', label: '等宽数字' },
];

export const LAYOUT_OPTIONS = [
  { value: 'single-left', label: '单图居左' },
  { value: 'single-right', label: '单图居右' },
  { value: 'grid-2x2', label: '2x2网格' },
  { value: 'multi', label: '多图排列' },
];

export const generateId = () => Math.random().toString(36).substring(2, 9);

export const createDefaultProduct = (index: number): Product => ({
  id: generateId(),
  number: String(index + 1).padStart(2, '0'),
  name: '制品名称',
  description: '制品说明',
  price: '',
  stock: '',
  images: [],
  layout: 'single-left',
  tag: '',
});

export const DEFAULT_STATE: PosterState = {
  theme: 'dark',
  accentColor: '#c0392b',
  mainImage: null,
  dateText: '7.18',
  locationText: '深圳',
  sideVerticalText: 'Devil May Cry',
  authorText: '@author',
  showAuthor: true,
  mainTitle: 'VD ONLY',
  englishTitle: 'Devil May Cry',
  boothNumber: 'A28',
  sectionTitle: '无料信息',
  slogan: '老登之恋沁人心脾',
  titleFont: "'Noto Serif SC', serif",
  bodyFont: "'Noto Sans SC', sans-serif",
  dividerStyle: 'decorated',
  numberStyle: 'serif',
  showBackgroundDecoration: true,
  products: [
    {
      id: generateId(),
      number: '01',
      name: '二代重绘 明信片',
      description: '到摊可领 / 两张一套',
      price: '',
      stock: '',
      images: [],
      layout: 'single-left',
      tag: '',
    },
    {
      id: generateId(),
      number: '02',
      name: '亚克力立牌',
      description: '有偿交换 / 限量20个',
      price: '',
      stock: '',
      images: [],
      layout: 'single-right',
      tag: '',
    },
  ],
  sectionLabels: ['新刊首发', '既刊复刻', '新制品', '往期制品'],
};
