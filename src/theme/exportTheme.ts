import type {TokenValues} from '../tokens/types';

/**
 * Turns the current edits into a stylesheet.
 *
 * The output is deliberately plain CSS custom properties on `:root` and nothing else. That is a
 * valid Liferay theme fragment as-is: drop it into a theme's `_custom.scss` (or a Style Book's CSS
 * field) and the same overrides apply to a real Liferay site, because the property names here are
 * Clay's own, not this repo's invention.
 */
export function toCss(edits: TokenValues): string {
	const entries = Object.entries(edits).sort(([a], [b]) => a.localeCompare(b));

	if (!entries.length) {
		return '/* No token edits yet — every value still matches the shipped default. */\n';
	}

	const body = entries
		.map(([cssVar, value]) => `\t${cssVar}: ${value};`)
		.join('\n');

	return [
		'/*',
		' * Token overrides exported from the Liferay Clay Workbench.',
		' *',
		' * These are Clay custom properties, so this block works unchanged in a Liferay theme or',
		' * Style Book — it does not depend on anything in the workbench repo.',
		' */',
		':root {',
		body,
		'}',
		'',
	].join('\n');
}

/** The same edits as JSON, for feeding a token pipeline or a Figma sync. */
export function toJson(edits: TokenValues): string {
	const sorted = Object.fromEntries(
		Object.entries(edits).sort(([a], [b]) => a.localeCompare(b))
	);

	return `${JSON.stringify(sorted, null, 2)}\n`;
}
