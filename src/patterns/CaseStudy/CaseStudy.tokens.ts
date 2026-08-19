import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const caseStudyTokens: TokenSet = {
	description: 'The single-customer story block, split media and copy.',
	id: 'case-study',
	kind: 'pattern',
	label: 'Case study',
	tokens: [
		color('--lw-case-bg', 'Section background', palette.blue900, {dark: darkPalette.surface2}),
		color('--lw-case-heading-color', 'Heading', palette.white, {dark: darkPalette.text}),
		color('--lw-case-body-color', 'Copy', palette.blue200, {dark: darkPalette.textDim}),
		color('--lw-case-quote-color', 'Pull quote', palette.cyan),
		color('--lw-case-media-bg', 'Media placeholder', palette.blue800, {dark: darkPalette.surface3}),
		color('--lw-case-metric-color', 'Metric figure', palette.white),
		{
			dark: darkPalette.text,
			cssVar: '--lw-case-padding-y',
			label: 'Section padding',
			type: 'length',
			value: '4.5rem',
		},
		{
			cssVar: '--lw-case-media-radius',
			label: 'Media radius',
			type: 'length',
			value: '0.75rem',
		},
	],
};
