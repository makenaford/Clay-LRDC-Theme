import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Dropdown tokens.
 *
 * The states here belong to the menu *item*, not the menu container — which is why the variant is
 * `item`. That matches liferay.com's main navigation, where the panel itself is static and only the
 * rows react to the pointer.
 */
export const dropDownTokens: TokenSet = {
	description:
		'Menu surface plus the per-item hover, active and disabled states used by the site header nav.',
	id: 'drop-down',
	kind: 'component',
	label: 'Dropdown',
	tokens: [
		color('--dropdown-background-color', 'Menu · surface', palette.white),
		color('--dropdown-border-color', 'Menu · border', palette.gray200),
		color('--dropdown-color', 'Menu · text', palette.gray900),
		color('--dropdown-item-color', 'Item · text', palette.gray900, {
			prop: 'color',
			state: 'default',
			variant: 'item',
		}),
		color('--dropdown-item-hover-background-color', 'Item · background', palette.blue50, {
			prop: 'background-color',
			state: 'hover',
			variant: 'item',
		}),
		color('--dropdown-item-hover-color', 'Item · text', palette.blue700, {
			prop: 'color',
			state: 'hover',
			variant: 'item',
		}),
		color('--dropdown-item-active-background-color', 'Item · background', palette.blue100, {
			prop: 'background-color',
			state: 'active',
			variant: 'item',
		}),
		color('--dropdown-item-active-color', 'Item · text', palette.blue800, {
			prop: 'color',
			state: 'active',
			variant: 'item',
		}),
		color('--dropdown-item-disabled-color', 'Item · text', palette.gray400, {
			prop: 'color',
			state: 'disabled',
			variant: 'item',
		}),
		color('--dropdown-header-color', 'Section header', palette.gray500),
		color('--dropdown-divider-bg', 'Divider', palette.gray200),
		{
			cssVar: '--dropdown-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--dropdown-box-shadow',
			label: 'Shadow',
			type: 'shadow',
			value: '0 4px 16px rgba(39, 40, 51, 0.12)',
		},
		{
			cssVar: '--dropdown-item-padding-x',
			label: 'Item padding · horizontal',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--dropdown-item-padding-y',
			label: 'Item padding · vertical',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--dropdown-font-size',
			label: 'Font size',
			type: 'length',
			value: '0.875rem',
		},
	],
};
