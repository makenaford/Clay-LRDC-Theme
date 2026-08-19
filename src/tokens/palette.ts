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

/**
 * The dark-theme ramp.
 *
 * Anchored on values taken from the Figma rather than dimmed by formula. `surface3` is
 * `Components/Label/lab-tonal-bg` in its dark mode, `text` is `Surfaces/Text/Primary` in its dark
 * mode, and `canvas` was measured off the exported frame the Label component sits on. The
 * intermediate steps interpolate between those fixed points.
 *
 * The greys read in the opposite direction to the light ramp: `surface0` is the page, `text` the
 * foreground. That inversion is what lets Clay's own `--gray-*` scale be remapped wholesale, so
 * components pick up the dark theme without each one needing its own override.
 */
export const darkPalette = {
	// Surfaces, lightest-sitting-on-darkest.
	canvas: '#070b13', // measured from the Figma frame behind the Label component
	surface0: '#10161f', // also the stroke colour the LRDC icon set exports with
	surface1: '#161d28',
	surface2: '#1f2531', // Figma: the gradient label's text colour, reused here as a raised surface
	surface3: '#313948', // Figma: Components/Label/lab-tonal-bg, dark mode
	border: '#3d465a',

	// Foreground, dimmest to brightest.
	textFaint: '#6b7488',
	textMuted: '#8b93a5',
	textDim: '#b4bbc9',
	text: '#f0f1f5', // Figma: Surfaces/Text/Primary, dark mode

	// Brand, adjusted so hover and active move *away* from a dark background rather than into it.
	primary: '#3d7dff',
	primaryHover: '#70a2ff', // Figma: lab-grad-bg-step-01, dark mode
	primaryActive: '#a8c6ff',
	primaryTint1: '#1b2b4d',
	primaryTint2: '#16233d',
	primaryTint3: '#111a2e',

	accent: '#ba8fff', // Figma: lab-grad-bg-step-02, dark mode
} as const;
