import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const siteFooterTokens: TokenSet = {
	description: 'Link columns, social row and the legal strip.',
	id: 'site-footer',
	kind: 'pattern',
	label: 'Site footer',
	tokens: [
		color('--lw-footer-bg', 'Background', palette.gray900),
		color('--lw-footer-heading-color', 'Column heading', palette.white),
		color('--lw-footer-link-color', 'Link', palette.gray400, {
			prop: 'color',
			state: 'default',
			variant: 'footer-link',
		}),
		color('--lw-footer-link-hover-color', 'Link', palette.white, {
			prop: 'color',
			state: 'hover',
			variant: 'footer-link',
		}),
		color('--lw-footer-divider', 'Divider', palette.gray700),
		color('--lw-footer-legal-color', 'Legal strip text', palette.gray500),
		{
			cssVar: '--lw-footer-padding-y',
			label: 'Vertical padding',
			type: 'length',
			value: '3.5rem',
		},
	],
};
