import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Tab tokens.
 *
 * Clay names the selected tab "active" (`--nav-tabs-link-active-*`) and the open-but-not-selected
 * one "show". Only `active` maps onto our shared state vocabulary, so `show` is left out rather than
 * mislabelled — a tab has no pressed state in the way a button does.
 */
export const navTabsTokens: TokenSet = {
	description: 'Tab strip — resting, selected and disabled links, plus the indicator rule.',
	id: 'nav-tabs',
	kind: 'component',
	label: 'Tabs',
	tokens: [
		color('--nav-tabs-link-color', 'Tab · text', palette.gray500, {
			dark: darkPalette.textMuted,
			prop: 'color',
			state: 'default',
			variant: 'tab',
		}),
		color('--nav-tabs-link-hover-border-color', 'Tab · border', palette.gray300, {
			dark: darkPalette.surface3,
			prop: 'border-color',
			state: 'hover',
			variant: 'tab',
		}),
		color('--nav-tabs-link-active-color', 'Tab · text', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'active',
			variant: 'tab',
		}),
		color('--nav-tabs-link-active-border-color', 'Tab · border', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'border-color',
			state: 'active',
			variant: 'tab',
		}),
		color('--nav-tabs-link-active-bg', 'Tab · background', 'transparent', {
			prop: 'background-color',
			state: 'active',
			variant: 'tab',
		}),
		color('--nav-tabs-link-disabled-color', 'Tab · text', palette.gray400, {
			dark: darkPalette.textFaint,
			prop: 'color',
			state: 'disabled',
			variant: 'tab',
		}),
		color('--nav-link-disabled-color', 'Nav link · disabled', palette.gray400),
		{
			dark: darkPalette.textFaint,
			cssVar: '--nav-tabs-border-width',
			label: 'Indicator width',
			type: 'length',
			value: '2px',
		},
		{
			cssVar: '--nav-tabs-font-size',
			label: 'Font size',
			type: 'length',
			value: '0.875rem',
		},
		{
			cssVar: '--nav-tabs-link-padding-x',
			label: 'Padding · horizontal',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--nav-tabs-link-padding-y',
			label: 'Padding · vertical',
			type: 'length',
			value: '0.75rem',
		},
	],
};
