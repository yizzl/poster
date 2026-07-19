import { toPng } from 'html-to-image';
import { usePosterStore } from '../store';

export async function downloadPoster() {
  const posterEl = document.getElementById('poster-export-target');
  if (!posterEl) return;

  // 确保字体已加载
  await document.fonts.ready;

  const theme = usePosterStore.getState().theme;
  const bgColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';

  const dataUrl = await toPng(posterEl, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: bgColor,
  });

  const link = document.createElement('a');
  link.download = `poster-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
