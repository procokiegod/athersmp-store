import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AtherStorePrototype } from './app.js';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AtherStorePrototype />
  </BrowserRouter>
);
