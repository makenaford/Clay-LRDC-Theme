/**
 * Post-build sanity check.
 *
 * Guards one specific silent failure. `src/styles/clay.scss` pulls Clay in with bare `@import`s
 * resolved through a load path, and Sass checks the importing file's own directory first — so a
 * sibling file named after one of Clay's partials shadows it. The build still succeeds and reports
 * no error; Clay simply is not in the output. That happened once, and the only symptom was the CSS
 * bundle quietly dropping from ~870 KB to 20 KB.
 *
 * A byte-count check alone would be brittle, so this asserts on content: Clay's classes must be
 * present, and they must be the custom-property build rather than the hardcoded one.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const assets = fileURLToPath(new URL('../dist/assets', import.meta.url));

const cssFiles = fs
	.readdirSync(assets)
	.filter((file) => file.endsWith('.css'))
	.map((file) => fs.readFileSync(path.join(assets, file), 'utf8'));

if (!cssFiles.length) {
	console.error('\n  check-build: no CSS emitted at all.\n');
	process.exit(1);
}

const css = cssFiles.join('');

const checks = [
	{
		hint: "Clay's classes are missing — most likely a file in src/styles/ is shadowing one of the partials imported by clay.scss.",
		label: 'Clay is compiled in',
		pass: css.includes('.btn-primary'),
	},
	{
		hint: 'Clay compiled, but as the hardcoded build. Check the import order in clay.scss — atlas-custom-properties/variables must come first.',
		label: 'Clay is the custom-property build',
		pass: css.includes('var(--btn-primary-hover-background-color'),
	},
	{
		hint: 'The label component is missing from the bundle.',
		label: 'Label styles present',
		pass: css.includes('lw-label--gradient'),
	},
];

const failed = checks.filter((check) => !check.pass);

for (const check of failed) {
	console.error(`\n  check-build: ${check.label} — FAILED\n    ${check.hint}`);
}

if (failed.length) {
	console.error('');
	process.exit(1);
}

console.log(
	`  check-build: ${checks.length} checks passed, CSS ${(css.length / 1024).toFixed(0)} KB`
);
