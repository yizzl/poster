import { toPng } from 'html-to-image';

export async function downloadPoster() {
  const posterEl = document.getElementById('poster-export-target');
  if (!posterEl) return;

  // 确保字体已加载
  await document.fonts.ready;

  const dataUrl = await toPng(posterEl, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#1a1a1a',
  });

  const link = document.createElement('a');
  link.download = `poster-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
