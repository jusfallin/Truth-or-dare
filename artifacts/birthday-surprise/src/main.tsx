import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';
import './bhavanika.css';
import './bhavanika-overrides.css';
import './bhavanika-mobile-fix.css';
import './bhavanika-gift-safe.css';
import './bhavanika-final-opening.css';
import './accessibility-fixes';
import './accessibility-polish.css';

createRoot(document.getElementById('root')!).render(<App />);
