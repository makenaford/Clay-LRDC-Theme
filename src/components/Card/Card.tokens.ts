import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Card tokens.
 *
 * Cards carry most of liferay.com's content — the capability grid, the resource grid and the case
 * study block are all cards. Clay has no `--card-hover-*` family, so the hover treatment the site
 * uses (lift + border tint) is expressed here through `--card-interactive-*`, which Clay does read.
 */
export const cardTokens: TokenSet = {
	description:
		'Surface, border and the interactive highlight used by the homepage capability and resource grids.',
	id: 'card',
	kind: 'component',
	label: 'Card',
	tokens: [
		color('--card-bg', 'Surface', palette.white, {
			prop: 'background-color',
			state: 'default',
			variant: 'card',
		}),
		color('--card-color', 'Body text', palette.gray900, {
			prop: 'color',
			state: 'default',
			variant: 'card',
		}),
		color('--card-border-color', 'Border', palette.gray200, {
			prop: 'border-color',
			state: 'default',
			variant: 'card',
		}),
		color('--card-header-background-color', 'Header · background', 'transparent'),
		color('--card-header-color', 'Header · text', palette.gray900),
		color('--card-footer-background-color', 'Footer · background', palette.gray50),
		color('--card-link-color', 'Card link', palette.blue500, {
			prop: 'color',
			state: 'default',
			variant: 'card-link',
		}),
		color('--card-link-hover-color', 'Card link', palette.blue600, {
			prop: 'color',
			state: 'hover',
			variant: 'card-link',
		}),
		{
			cssVar: '--card-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--card-border-width',
			label: 'Border width',
			type: 'length',
			value: '1px',
		},
		{
			cssVar: '--card-box-shadow',
			label: 'Shadow',
			type: 'shadow',
			value: '0 1px 2px rgba(39, 40, 51, 0.08)',
		},
		{
			cssVar: '--card-body-padding-top',
			label: 'Body padding · top',
			type: 'length',
			value: '1.5rem',
		},
		{
			cssVar: '--card-body-padding-right',
			label: 'Body padding · right',
			type: 'length',
			value: '1.5rem',
		},
		{
			cssVar: '--card-body-padding-bottom',
			label: 'Body padding · bottom',
			type: 'length',
			value: '1.5rem',
		},
		{
			cssVar: '--card-body-padding-left',
			label: 'Body padding · left',
			type: 'length',
			value: '1.5rem',
		},
	],
};
