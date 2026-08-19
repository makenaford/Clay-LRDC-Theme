import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const capabilityGridTokens: TokenSet = {
	description:
		'The eight-capability grid. Card surfaces come from the Card component — these tokens cover the section around them.',
	id: 'capability-grid',
	kind: 'pattern',
	label: 'Capability grid',
	tokens: [
		color('--lw-capability-bg', 'Section background', palette.gray50, {dark: darkPalette.surface0}),
		color('--lw-capability-heading-color', 'Section heading', palette.gray900, {dark: darkPalette.text}),
		color('--lw-capability-icon-bg', 'Icon chip background', palette.blue50, {
			dark: darkPalette.primaryTint1,
			prop: 'background-color',
			state: 'default',
			variant: 'icon',
		}),
		color('--lw-capability-icon-color', 'Icon chip glyph', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'default',
			variant: 'icon',
		}),
		color('--lw-capability-icon-hover-bg', 'Icon chip background', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'background-color',
			state: 'hover',
			variant: 'icon',
		}),
		color('--lw-capability-icon-hover-color', 'Icon chip glyph', palette.white, {
			dark: darkPalette.canvas,
			prop: 'color',
			state: 'hover',
			variant: 'icon',
		}),
		{
			cssVar: '--lw-capability-gap',
			label: 'Grid gap',
			type: 'length',
			value: '1.5rem',
		},
		{
			cssVar: '--lw-capability-padding-y',
			label: 'Section padding',
			type: 'length',
			value: '4rem',
		},
	],
};
