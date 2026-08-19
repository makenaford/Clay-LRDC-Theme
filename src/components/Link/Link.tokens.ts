import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Link tokens. Clay exposes a focus colour for links but no active one, so the matrix stops at
 * focus — links on liferay.com do not change colour while being pressed.
 */
export const linkTokens: TokenSet = {
	description: 'Body and primary links with their hover and focus treatments.',
	id: 'link',
	kind: 'component',
	label: 'Link',
	tokens: [
		color('--link-color', 'Default · text', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'default',
			variant: 'default',
		}),
		color('--link-hover-color', 'Default · text', palette.blue600, {
			dark: darkPalette.primaryActive,
			prop: 'color',
			state: 'hover',
			variant: 'default',
		}),
		color('--link-primary-color', 'Primary · text', palette.blue500, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'default',
			variant: 'primary',
		}),
		color('--link-primary-hover-color', 'Primary · text', palette.blue600, {
			dark: darkPalette.primaryActive,
			prop: 'color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--link-primary-focus-color', 'Primary · text', palette.blue800, {
			dark: darkPalette.primaryActive,
			prop: 'color',
			state: 'focus',
			variant: 'primary',
		}),
		color('--link-secondary-color', 'Secondary · text', palette.gray500, {
			dark: darkPalette.textMuted,
			prop: 'color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--link-secondary-hover-color', 'Secondary · text', palette.gray900, {
			dark: darkPalette.text,
			prop: 'color',
			state: 'hover',
			variant: 'secondary',
		}),
		{
			cssVar: '--link-decoration',
			label: 'Underline · resting',
			type: 'text',
			value: 'none',
		},
		{
			cssVar: '--link-hover-decoration',
			label: 'Underline · hover',
			type: 'text',
			value: 'underline',
		},
		{
			cssVar: '--link-primary-focus-box-shadow',
			label: 'Focus ring',
			type: 'shadow',
			value: `0 0 0 0.125rem ${palette.blue200}`,
		},
	],
};
