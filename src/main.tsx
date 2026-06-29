import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AtherStorePrototype } from './app';

const root = createRoot(document.getElementById('root')!);
root.render(<BrowserRouter><AtherStorePrototype /></BrowserRouter>);
