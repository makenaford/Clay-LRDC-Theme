import {fileURLToPath} from 'node:url';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Clay ships its Sass source, not just compiled CSS. We compile it ourselves (see
// `src/styles/clay.scss`) so that we get the `atlas-custom-properties` build — the one where every
// declaration reads `var(--btn-primary-hover-background-color, <fallback>)`. That is what makes
// every colour and interaction state in this repo editable at runtime.
const clayScss = fileURLToPath(
	new URL('./node_modules/@clayui/css/src/scss', import.meta.url)
);

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [clayScss],

				// Clay 3 is still written against the pre-module Sass API. These warnings come
				// from Clay's own source, not ours, and there is nothing we can fix in them.
				quietDeps: true,
				silenceDeprecations: [
					'import',
					'global-builtin',
					'color-functions',
					'slash-div',
					'abs-percent',
					'legacy-js-api',
				],
			},
		},
	},
	plugins: [react()],
	server: {
		port: 5180,
	},
});
