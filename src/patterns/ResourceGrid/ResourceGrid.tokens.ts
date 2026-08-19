import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const resourceGridTokens: TokenSet = {
	description:
		'Trending content cards. Badges and card surfaces come from their components — these frame the section.',
	id: 'resource-grid',
	kind: 'pattern',
	label: 'Resource grid',
	tokens: [
		color('--lw-resource-bg', 'Section background', palette.white),
		color('--lw-resource-heading-color', 'Section heading', palette.gray900),
		color('--lw-resource-meta-color', 'Card meta text', palette.gray500),
		color('--lw-resource-thumb-bg', 'Thumbnail placeholder', palette.gray100),
		{
			cssVar: '--lw-resource-gap',
			label: 'Grid gap',
			type: 'length',
			value: '1.5rem',
		},
		{
			cssVar: '--lw-resource-padding-y',
			label: 'Section padding',
			type: 'length',
			value: '4rem',
		},
	],
};
