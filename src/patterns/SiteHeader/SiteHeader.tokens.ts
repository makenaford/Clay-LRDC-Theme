import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const siteHeaderTokens: TokenSet = {
	description:
		'The fixed masthead: utility strip, primary navigation and the two conversion buttons.',
	id: 'site-header',
	kind: 'pattern',
	label: 'Site header',
	tokens: [
		color('--lw-header-bg', 'Header background', palette.white, {dark: darkPalette.surface0}),
		color('--lw-header-border', 'Bottom border', palette.gray200, {dark: darkPalette.border}),
		color('--lw-header-link-color', 'Nav link', palette.gray900, {
			dark: darkPalette.text,
			prop: 'color',
			state: 'default',
			variant: 'nav-link',
		}),
		color('--lw-header-link-hover-color', 'Nav link', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'hover',
			variant: 'nav-link',
		}),
		color('--lw-header-utility-bg', 'Utility strip background', palette.gray50, {dark: darkPalette.canvas}),
		color('--lw-header-utility-color', 'Utility strip text', palette.gray500),
		{
			dark: darkPalette.textMuted,
			cssVar: '--lw-header-height',
			label: 'Header height',
			type: 'length',
			value: '4.5rem',
		},
		{
			cssVar: '--lw-header-shadow',
			label: 'Shadow',
			type: 'shadow',
			value: '0 1px 0 rgba(39, 40, 51, 0.06)',
		},
	],
};
