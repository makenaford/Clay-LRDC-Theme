import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const logoBarTokens: TokenSet = {
	description: 'The customer proof strip that sits directly under the hero.',
	id: 'logo-bar',
	kind: 'pattern',
	label: 'Logo bar',
	tokens: [
		color('--lw-logobar-bg', 'Background', palette.white),
		color('--lw-logobar-label-color', 'Intro label', palette.gray500),
		color('--lw-logobar-logo-color', 'Logo wordmark', palette.gray400, {
			prop: 'color',
			state: 'default',
			variant: 'logo',
		}),
		color('--lw-logobar-logo-hover-color', 'Logo wordmark', palette.gray700, {
			prop: 'color',
			state: 'hover',
			variant: 'logo',
		}),
		{
			cssVar: '--lw-logobar-padding-y',
			label: 'Vertical padding',
			type: 'length',
			value: '2.5rem',
		},
	],
};
