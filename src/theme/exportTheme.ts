import type {TokenValues} from '../tokens/types';

interface ModeEdits {
	dark: TokenValues;
	light: TokenValues;
}

/**
 * Turns the current edits into a stylesheet.
 *
 * Dark is the default theme, so dark values sit on `:root` and light is the override under
 * `[data-theme='light']`. That ordering matters: a page that never sets `data-theme` gets the dark
 * theme, which is what "dark by default" has to mean once the CSS leaves this app.
 *
 * The output is plain CSS custom properties and nothing else, so it is a valid Liferay theme
 * fragment as-is — drop it into a theme's `_custom.scss` or a Style Book's CSS field and the same
 * overrides apply, because the property names here are Clay's own rather than this repo's.
 */
export function toCss(edits: ModeEdits): string {
	const block = (values: TokenValues) =>
		Object.entries(values)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([cssVar, value]) => `\t${cssVar}: ${value};`)
			.join('\n');

	const darkCount = Object.keys(edits.dark).length;
	const lightCount = Object.keys(edits.light).length;

	if (!darkCount && !lightCount) {
		return '/* No token edits yet — every value still matches the shipped default. */\n';
	}

	const out = [
		'/*',
		' * Token overrides exported from the Clay LRDC Theme workbench.',
		' *',
		' * These are Clay custom properties, so this works unchanged in a Liferay theme or Style',
		" * Book — it does not depend on anything in this repo. Dark is the default theme, so it is",
		' * what `:root` carries; light is applied by setting `data-theme="light"`.',
		' */',
	];

	if (darkCount) {
		out.push('', ':root {', block(edits.dark), '}');
	}

	if (lightCount) {
		out.push('', "[data-theme='light'] {", block(edits.light), '}');
	}

	out.push('');

	return out.join('\n');
}

/** The same edits as JSON, for feeding a token pipeline or a Figma sync. */
export function toJson(edits: ModeEdits): string {
	const sorted = (values: TokenValues) =>
		Object.fromEntries(Object.entries(values).sort(([a], [b]) => a.localeCompare(b)));

	return `${JSON.stringify({dark: sorted(edits.dark), light: sorted(edits.light)}, null, 2)}\n`;
}
