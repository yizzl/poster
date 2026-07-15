import { create } from 'zustand';
import type { PosterState, Product } from './types';
import { DEFAULT_STATE, generateId, createDefaultProduct } from './constants';

interface PosterStore extends PosterState {
  update: (partial: Partial<PosterState>) => void;
  addProduct: () => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, partial: Partial<Product>) => void;
  reorderProduct: (id: string, direction: 'up' | 'down') => void;
  addSectionLabel: () => void;
  removeSectionLabel: (index: number) => void;
  updateSectionLabel: (index: number, value: string) => void;
  switchTheme: (theme: 'dark' | 'light') => void;
}

export const usePosterStore = create<PosterStore>((set) => ({
  ...DEFAULT_STATE,

  update: (partial) => set(partial),

  switchTheme: (theme) =>
    set((state) => {
      if (theme === 'dark' && state.theme !== 'dark') {
        return {
          theme: 'dark',
          accentColor: '#c0392b',
          mainTitle: 'VD ONLY',
          englishTitle: 'Devil May Cry',
          sectionTitle: '无料信息',
          slogan: '老登之恋沁人心脾',
          dateText: '7.18',
          locationText: '深圳',
          sideVerticalText: 'Devil May Cry',
          boothNumber: 'A28',
        };
      }
      if (theme === 'light' && state.theme !== 'light') {
        return {
          theme: 'light',
          accentColor: '#16a085',
          mainTitle: '有偿交换',
          englishTitle: 'PAID EXCHANGE',
          sectionTitle: '商品列表',
          slogan: '欢迎来摊位交换',
          dateText: '7.18',
          locationText: '深圳',
          sideVerticalText: '',
          boothNumber: 'A28',
        };
      }
      return {};
    }),

  addProduct: () =>
    set((state) => ({
      products: [...state.products, createDefaultProduct(state.products.length)],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (id, partial) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...partial } : p,
      ),
    })),

  reorderProduct: (id, direction) =>
    set((state) => {
      const products = [...state.products];
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) return {};
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= products.length) return {};
      [products[index], products[swapIndex]] = [products[swapIndex], products[index]];
      return { products };
    }),

  addSectionLabel: () =>
    set((state) => ({
      sectionLabels: [...state.sectionLabels, '新标签'],
    })),

  removeSectionLabel: (index) =>
    set((state) => ({
      sectionLabels: state.sectionLabels.filter((_, i) => i !== index),
    })),

  updateSectionLabel: (index, value) =>
    set((state) => ({
      sectionLabels: state.sectionLabels.map((label, i) =>
        i === index ? value : label,
      ),
    })),
}));
