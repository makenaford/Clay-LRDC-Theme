import {darkPalette, palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Badge tokens. Clay gives badges a default and a hover per variant (they are often links), which
 * is why only those two states appear here — there is no active or disabled badge in Clay.
 */
export const badgeTokens: TokenSet = {
	description:
		'Eyebrow labels — "New", "Guide", "Ebook" — used across the homepage resource cards.',
	id: 'badge',
	kind: 'component',
	label: 'Badge',
	tokens: [
		color('--badge-primary-background-color', 'Primary · background', palette.blue50, {
			dark: darkPalette.primaryTint1,
			prop: 'background-color',
			state: 'default',
			variant: 'primary',
		}),
		color('--badge-primary-color', 'Primary · label', palette.blue700, {
			dark: darkPalette.primaryHover,
			prop: 'color',
			state: 'default',
			variant: 'primary',
		}),
		color('--badge-primary-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'default',
			variant: 'primary',
		}),
		color('--badge-primary-hover-background-color', 'Primary · background', palette.blue100, {
			dark: '#22365e',
			prop: 'background-color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--badge-primary-hover-color', 'Primary · label', palette.blue800, {
			dark: darkPalette.primaryActive,
			prop: 'color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--badge-primary-hover-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--badge-secondary-background-color', 'Secondary · background', palette.gray100, {
			dark: darkPalette.surface1,
			prop: 'background-color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--badge-secondary-color', 'Secondary · label', palette.gray600, {
			dark: darkPalette.textDim,
			prop: 'color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--badge-secondary-hover-background-color', 'Secondary · background', palette.gray200, {
			dark: darkPalette.surface2,
			prop: 'background-color',
			state: 'hover',
			variant: 'secondary',
		}),
		color('--badge-secondary-hover-color', 'Secondary · label', palette.gray900, {
			dark: darkPalette.text,
			prop: 'color',
			state: 'hover',
			variant: 'secondary',
		}),
		color('--badge-success-background-color', 'Success · background', palette.successLight, {dark: '#14371f'}),
		color('--badge-success-color', 'Success · label', palette.success),
		{
			dark: palette.successLight,
			cssVar: '--badge-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '624.9375rem',
		},
		{
			cssVar: '--badge-font-size',
			label: 'Font size',
			type: 'length',
			value: '0.75rem',
		},
		{
			cssVar: '--badge-font-weight',
			label: 'Font weight',
			type: 'number',
			value: '600',
		},
		{
			cssVar: '--badge-padding-x',
			label: 'Padding · horizontal',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--badge-padding-y',
			label: 'Padding · vertical',
			type: 'length',
			value: '0.25rem',
		},
	],
};
