import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';
import './bhavanika.css';
import './bhavanika-overrides.css';
import './bhavanika-mobile-fix.css';

createRoot(document.getElementById('root')!).render(<App />);
