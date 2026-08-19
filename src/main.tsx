import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './App';

// Source Sans 3, self-hosted rather than pulled from a CDN: no external request, no third-party
// dependency at runtime, and it works offline. Fontsource ships it as a variable font split by
// script with `unicode-range`, so an English page downloads only the latin subset (28 KB) even
// though every subset is declared. The italic file is imported because the case-study pull quote
// actually uses it — without it the browser would synthesise a slanted face.
import '@fontsource-variable/source-sans-3';
import '@fontsource-variable/source-sans-3/wght-italic.css';

// Order matters: Clay first, then our layers, so ours can rely on cascade position rather than
// specificity hacks.
import './styles/clay.scss';
import './styles/component-overrides.css';
import './styles/patterns.css';
import './styles/workbench.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
