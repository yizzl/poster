import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Poster } from './components/Poster';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <div className="app-body">
        <Editor />
        <div className="preview-area">
          <Poster />
        </div>
      </div>
    </div>
  );
}
