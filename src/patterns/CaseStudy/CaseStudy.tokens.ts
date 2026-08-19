import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const caseStudyTokens: TokenSet = {
	description: 'The single-customer story block, split media and copy.',
	id: 'case-study',
	kind: 'pattern',
	label: 'Case study',
	tokens: [
		color('--lw-case-bg', 'Section background', palette.blue900),
		color('--lw-case-heading-color', 'Heading', palette.white),
		color('--lw-case-body-color', 'Copy', palette.blue200),
		color('--lw-case-quote-color', 'Pull quote', palette.cyan),
		color('--lw-case-media-bg', 'Media placeholder', palette.blue800),
		color('--lw-case-metric-color', 'Metric figure', palette.white),
		{
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
