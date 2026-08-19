/**
 * The raw liferay.com palette.
 *
 * Every value here was read out of liferay.com's own stylesheets and markup (the homepage plus
 * `/o/classic-theme/css/clay.css`), ordered by how often each hex actually appears. Nothing in this
 * file is invented — it is the ramp the live site ships.
 *
 * This is the only place raw hexes belong. Everything downstream (global tokens, component tokens,
 * pattern tokens) references these names, so re-branding the whole system is a matter of editing
 * this one file.
 */

export const palette = {
	// --- Liferay blue -------------------------------------------------------------------------
	// The primary ramp. `blue600`/`blue700` are what the site uses for hover and active states on
	// primary buttons, which is why the button tokens reach for them rather than a computed shade.
	blue50: '#edf3fe',
	blue100: '#e7efff',
	blue200: '#b3cdff',
	blue300: '#70a1ff',
	blue400: '#6399ff',
	blue500: '#0b5fff', // brand primary
	blue600: '#0053f0', // hover
	blue700: '#004ad7',
	blue800: '#00318f', // active / pressed
	blue900: '#1514a4',

	// --- Neutrals -----------------------------------------------------------------------------
	// Lexicon's greys. `gray900` is the site's body copy colour, `gray600` its secondary text.
	white: '#ffffff',
	gray50: '#f7f8f9',
	gray100: '#f1f2f5',
	gray200: '#e7e7ed',
	gray300: '#cdced9',
	gray400: '#a7a9bc',
	gray500: '#6b6c7e',
	gray600: '#54555f',
	gray700: '#3f404b',
	gray800: '#282934',
	gray900: '#272833',
	black: '#000000',

	// --- Accents ------------------------------------------------------------------------------
	// Used sparingly on the marketing site: cyan for highlights over dark sections, purple for
	// campaign accents.
	cyan: '#47fffc',
	cyanDark: '#14fffb',
	purple: '#7414ff',

	// --- Status ------------------------------------------------------------------------------
	success: '#0d863a',
	successLight: '#6ada92',
	warning: '#b95000',
	danger: '#da1414',
	info: '#2e5aac',
} as const;

export type PaletteName = keyof typeof palette;
