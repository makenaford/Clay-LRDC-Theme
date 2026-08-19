/**
 * Builds the project spritemap from `src/icons/icons.manifest.json`.
 *
 * Two sources go in and one sprite comes out:
 *
 *   - LRDC icons, read from `src/icons/library/` (a mirror of the Figma export). These are
 *     normalised on the way through — see `normalise()`.
 *   - Clay's own symbols, lifted verbatim from `@clayui/css`. Clay's components hardcode these
 *     names internally, so they have to be present or parts of Clay render as nothing.
 *
 * Also emits `src/icons/registry.ts`, which turns the manifest into a union type. That is the point
 * of generating rather than hand-writing it: `ClayIcon`'s `symbol` prop is typed `string`, so a
 * typo produces an invisible icon at runtime with no error anywhere. The union makes it a compile
 * error instead.
 *
 * Run with `pnpm icons`. `pnpm dev` and `pnpm build` both run it first.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

const LIBRARY = path.join(root, 'src/icons/library');
const MANIFEST = path.join(root, 'src/icons/icons.manifest.json');
const CLAY_SPRITE = path.join(
	root,
	'node_modules/@clayui/css/lib/images/icons/icons.svg'
);
const OUT_SPRITE = path.join(root, 'public/icons.svg');
const OUT_REGISTRY = path.join(root, 'src/icons/registry.ts');

/**
 * Files whose Figma export is corrupt — raw gradient JSON ends up inside a `fill` attribute, which
 * is not valid SVG. Listed rather than silently skipped so that adding one to the manifest fails
 * with an explanation instead of shipping a broken symbol.
 */
const KNOWN_BAD = new Set([
	'system/loading',
	'system/loading_2',
	'system/loading_4',
]);

function fail(message) {
	console.error(`\n  icons: ${message}\n`);
	process.exit(1);
}

/**
 * Makes an exported icon themeable.
 *
 * The library is stroke-based and every icon hardcodes `#10161F`, so as exported none of them
 * respond to the design tokens. Rewriting to `currentColor` is what lets an icon inherit whatever
 * colour its context sets — which is how a token change reaches it.
 *
 * `fill="none"` is deliberately left alone: on a stroke-based icon that is structural, marking a
 * shape as outline-only. Rewriting it to `currentColor` would flood every icon with solid fills.
 */
function normalise(svg, source) {
	const open = svg.match(/<svg\b[^>]*>/i);

	if (!open) {
		fail(`${source}: no <svg> element found`);
	}

	const viewBox = open[0].match(/viewBox="([^"]+)"/i);

	if (!viewBox) {
		fail(`${source}: no viewBox, cannot be placed in a sprite`);
	}

	let inner = svg
		.slice(open.index + open[0].length)
		.replace(/<\/svg>\s*$/i, '');

	if (/GRADIENT_|&#34;type&#34;/.test(inner)) {
		fail(
			`${source}: contains raw Figma gradient JSON in an attribute and is not valid SVG. Re-export it.`
		);
	}

	// Any hardcoded colour becomes currentColor; structural fill="none" survives untouched.
	inner = inner
		.replace(/stroke="#[0-9a-f]{3,8}"/gi, 'stroke="currentColor"')
		.replace(/fill="#[0-9a-f]{3,8}"/gi, 'fill="currentColor"');

	// xmlns on inner nodes is redundant inside a sprite and only adds bytes.
	inner = inner.replace(/\s*xmlns="[^"]*"/g, '').trim();

	return {inner, viewBox: viewBox[1]};
}

// --- LRDC icons -------------------------------------------------------------------------------

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

const symbols = [];
const names = [];

for (const [name, sourcePath] of Object.entries(manifest.lrdc)) {
	if (KNOWN_BAD.has(sourcePath)) {
		fail(
			`"${name}" points at ${sourcePath}, a known-bad export (Figma JSON in its attributes). Re-export it before use.`
		);
	}

	const file = path.join(LIBRARY, `${sourcePath}.svg`);

	if (!fs.existsSync(file)) {
		fail(`"${name}" points at ${sourcePath}.svg, which does not exist in src/icons/library/`);
	}

	const {inner, viewBox} = normalise(fs.readFileSync(file, 'utf8'), sourcePath);

	const id = `lrdc-${name}`;

	symbols.push(`<symbol id="${id}" viewBox="${viewBox}" fill="none">${inner}</symbol>`);
	names.push(id);
}

// --- Clay's internal symbols ------------------------------------------------------------------

if (!fs.existsSync(CLAY_SPRITE)) {
	fail('Clay spritemap not found — run `pnpm install` first.');
}

const claySprite = fs.readFileSync(CLAY_SPRITE, 'utf8');

for (const symbol of manifest.clay) {
	const match = claySprite.match(
		new RegExp(`<symbol[^>]*id="${symbol}"[\\s\\S]*?</symbol>`)
	);

	if (!match) {
		fail(`Clay symbol "${symbol}" not found in the installed @clayui/css spritemap.`);
	}

	// Taken verbatim: these are Clay's own icons rendered by Clay's own components, and Clay's CSS
	// expects its `lexicon-icon-*` classes intact.
	symbols.push(match[0]);
	names.push(symbol);
}

// --- Emit --------------------------------------------------------------------------------------

fs.mkdirSync(path.dirname(OUT_SPRITE), {recursive: true});

fs.writeFileSync(
	OUT_SPRITE,
	`<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>\n`
);

const sorted = [...names].sort();

fs.writeFileSync(
	OUT_REGISTRY,
	[
		'/**',
		' * GENERATED FILE — do not edit.',
		' *',
		' * Run `pnpm icons` to regenerate from `icons.manifest.json`.',
		' *',
		' * This exists to give icon names a type. `ClayIcon`s `symbol` prop is `string`, so a',
		' * misspelled name renders an empty <svg> with no error at all — the union below turns that',
		' * silent failure into a compile error.',
		' */',
		'',
		'export const ICON_NAMES = [',
		...sorted.map((name) => `\t'${name}',`),
		'] as const;',
		'',
		'export type IconName = (typeof ICON_NAMES)[number];',
		'',
	].join('\n')
);

const bytes = fs.statSync(OUT_SPRITE).size;

console.log(
	`  icons: ${names.length} symbols (${Object.keys(manifest.lrdc).length} LRDC + ${manifest.clay.length} Clay) -> public/icons.svg, ${(bytes / 1024).toFixed(1)} KB`
);
