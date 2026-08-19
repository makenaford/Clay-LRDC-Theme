import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './App';

// Order matters: Clay first, then our layers, so ours can rely on cascade position rather than
// specificity hacks.
import './styles/clay.scss';
import './styles/components.css';
import './styles/patterns.css';
import './styles/workbench.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
