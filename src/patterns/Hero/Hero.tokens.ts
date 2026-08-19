import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const heroTokens: TokenSet = {
	description:
		'The opening statement block — headline, supporting copy, rating badge and the primary CTA pair.',
	id: 'hero',
	kind: 'pattern',
	label: 'Hero',
	tokens: [
		color('--lw-hero-bg', 'Background', palette.gray900, {dark: darkPalette.canvas}),
		color('--lw-hero-bg-accent', 'Background accent', palette.blue900, {
			dark: '#231a5e',
			description: 'The second stop of the hero gradient.',
		}),
		color('--lw-hero-heading-color', 'Headline', palette.white, {dark: darkPalette.text}),
		color('--lw-hero-body-color', 'Supporting copy', palette.gray300, {dark: darkPalette.textDim}),
		color('--lw-hero-eyebrow-color', 'Eyebrow', palette.cyan),
		color('--lw-hero-rating-color', 'Rating badge text', palette.white),
		{
			dark: darkPalette.text,
			cssVar: '--lw-hero-padding-y',
			label: 'Vertical padding',
			type: 'length',
			value: '5rem',
		},
		{
			cssVar: '--lw-hero-heading-size',
			label: 'Headline size',
			type: 'length',
			value: '3.25rem',
		},
	],
};
