import { usePosterStore } from '../store';
import { DarkPoster } from './DarkPoster';
import { LightPoster } from './LightPoster';
import './Poster.css';

export function Poster() {
  const theme = usePosterStore((s) => s.theme);

  return (
    <div className="poster-wrapper">
      <div id="poster-export-target">
        {theme === 'dark' ? <DarkPoster /> : <LightPoster />}
      </div>
    </div>
  );
}
