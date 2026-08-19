import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

export const solutionsTabsTokens: TokenSet = {
	description:
		'The solutions carousel, rebuilt as a tab strip. Tab colours come from the Tabs component; these are the panel around them.',
	id: 'solutions-tabs',
	kind: 'pattern',
	label: 'Solutions tabs',
	tokens: [
		color('--lw-solutions-bg', 'Section background', palette.white, {dark: darkPalette.canvas}),
		color('--lw-solutions-panel-bg', 'Panel background', palette.gray50, {dark: darkPalette.surface1}),
		color('--lw-solutions-panel-border', 'Panel border', palette.gray200, {dark: darkPalette.border}),
		color('--lw-solutions-heading-color', 'Panel heading', palette.gray900, {dark: darkPalette.text}),
		color('--lw-solutions-body-color', 'Panel copy', palette.gray600),
		{
			dark: darkPalette.textDim,
			cssVar: '--lw-solutions-panel-radius',
			label: 'Panel radius',
			type: 'length',
			value: '0.75rem',
		},
		{
			cssVar: '--lw-solutions-padding-y',
			label: 'Section padding',
			type: 'length',
			value: '4rem',
		},
	],
};
