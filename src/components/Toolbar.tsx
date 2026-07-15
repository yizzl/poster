import { usePosterStore } from '../store';
import { COLOR_OPTIONS } from '../constants';
import { downloadPoster } from '../utils/export';
import { Download, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function Toolbar() {
  const { theme, accentColor, switchTheme, update } = usePosterStore();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await downloadPoster();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-title">漫展摊位海报生成器</h1>
      </div>

      <div className="toolbar-right">
        <div className="theme-switch">
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => switchTheme('dark')}
          >
            <Moon size={16} />
            深色
          </button>
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => switchTheme('light')}
          >
            <Sun size={16} />
            浅色
          </button>
        </div>

        <div className="color-picker-group">
          <span className="color-label">主色</span>
          <div className="color-swatches">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                className={`color-swatch ${accentColor === color.value ? 'active' : ''}`}
                style={{ background: color.value }}
                title={color.label}
                onClick={() => update({ accentColor: color.value })}
              />
            ))}
          </div>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => update({ accentColor: e.target.value })}
            className="color-input"
          />
        </div>

        <button className="export-btn" onClick={handleExport} disabled={exporting}>
          <Download size={16} />
          {exporting ? '导出中...' : '导出图片'}
        </button>
      </div>
    </div>
  );
}
