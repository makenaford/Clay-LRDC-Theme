import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Button tokens.
 *
 * Clay gives buttons a complete state family per variant — `--btn-<variant>-<state>-<prop>` — so
 * every cell below maps to a property Clay's stylesheet already reads. There is nothing to override.
 *
 * Focus is the one exception: Clay does not colour the focus state, it draws a ring via
 * `--btn-focus-box-shadow`. It is listed at the bottom rather than in the state family, because a
 * ring is a shadow, not a colour swap.
 */
export const buttonTokens: TokenSet = {
	description:
		'Primary, secondary and outline variants with their full hover / active / disabled state families.',
	id: 'button',
	kind: 'component',
	label: 'Button',
	tokens: [
		// --- Primary -------------------------------------------------------------------------
		color('--btn-primary-background-color', 'Primary · background', palette.blue500, {
			prop: 'background-color',
			state: 'default',
			variant: 'primary',
		}),
		color('--btn-primary-color', 'Primary · label', palette.white, {
			prop: 'color',
			state: 'default',
			variant: 'primary',
		}),
		color('--btn-primary-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'default',
			variant: 'primary',
		}),
		color('--btn-primary-hover-background-color', 'Primary · background', palette.blue600, {
			prop: 'background-color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--btn-primary-hover-color', 'Primary · label', palette.white, {
			prop: 'color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--btn-primary-hover-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'hover',
			variant: 'primary',
		}),
		color('--btn-primary-active-background-color', 'Primary · background', palette.blue800, {
			prop: 'background-color',
			state: 'active',
			variant: 'primary',
		}),
		color('--btn-primary-active-color', 'Primary · label', palette.white, {
			prop: 'color',
			state: 'active',
			variant: 'primary',
		}),
		color('--btn-primary-active-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'active',
			variant: 'primary',
		}),
		color('--btn-primary-disabled-background-color', 'Primary · background', palette.blue200, {
			prop: 'background-color',
			state: 'disabled',
			variant: 'primary',
		}),
		color('--btn-primary-disabled-color', 'Primary · label', palette.white, {
			prop: 'color',
			state: 'disabled',
			variant: 'primary',
		}),
		color('--btn-primary-disabled-border-color', 'Primary · border', 'transparent', {
			prop: 'border-color',
			state: 'disabled',
			variant: 'primary',
		}),

		// --- Secondary -----------------------------------------------------------------------
		color('--btn-secondary-background-color', 'Secondary · background', palette.white, {
			prop: 'background-color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--btn-secondary-color', 'Secondary · label', palette.gray900, {
			prop: 'color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--btn-secondary-border-color', 'Secondary · border', palette.gray300, {
			prop: 'border-color',
			state: 'default',
			variant: 'secondary',
		}),
		color('--btn-secondary-hover-background-color', 'Secondary · background', palette.gray50, {
			prop: 'background-color',
			state: 'hover',
			variant: 'secondary',
		}),
		color('--btn-secondary-hover-color', 'Secondary · label', palette.blue600, {
			prop: 'color',
			state: 'hover',
			variant: 'secondary',
		}),
		color('--btn-secondary-hover-border-color', 'Secondary · border', palette.blue500, {
			prop: 'border-color',
			state: 'hover',
			variant: 'secondary',
		}),
		color('--btn-secondary-active-background-color', 'Secondary · background', palette.blue50, {
			prop: 'background-color',
			state: 'active',
			variant: 'secondary',
		}),
		color('--btn-secondary-active-color', 'Secondary · label', palette.blue800, {
			prop: 'color',
			state: 'active',
			variant: 'secondary',
		}),
		color('--btn-secondary-active-border-color', 'Secondary · border', palette.blue800, {
			prop: 'border-color',
			state: 'active',
			variant: 'secondary',
		}),
		color('--btn-secondary-disabled-background-color', 'Secondary · background', palette.gray100, {
			prop: 'background-color',
			state: 'disabled',
			variant: 'secondary',
		}),
		color('--btn-secondary-disabled-color', 'Secondary · label', palette.gray400, {
			prop: 'color',
			state: 'disabled',
			variant: 'secondary',
		}),
		color('--btn-secondary-disabled-border-color', 'Secondary · border', palette.gray200, {
			prop: 'border-color',
			state: 'disabled',
			variant: 'secondary',
		}),

		// --- Outline primary -----------------------------------------------------------------
		color('--btn-outline-primary-background-color', 'Outline · background', 'transparent', {
			prop: 'background-color',
			state: 'default',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-color', 'Outline · label', palette.blue500, {
			prop: 'color',
			state: 'default',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-border-color', 'Outline · border', palette.blue500, {
			prop: 'border-color',
			state: 'default',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-hover-background-color', 'Outline · background', palette.blue500, {
			prop: 'background-color',
			state: 'hover',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-hover-color', 'Outline · label', palette.white, {
			prop: 'color',
			state: 'hover',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-hover-border-color', 'Outline · border', palette.blue500, {
			prop: 'border-color',
			state: 'hover',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-active-background-color', 'Outline · background', palette.blue800, {
			prop: 'background-color',
			state: 'active',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-active-color', 'Outline · label', palette.white, {
			prop: 'color',
			state: 'active',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-active-border-color', 'Outline · border', palette.blue800, {
			prop: 'border-color',
			state: 'active',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-disabled-background-color', 'Outline · background', 'transparent', {
			prop: 'background-color',
			state: 'disabled',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-disabled-color', 'Outline · label', palette.gray400, {
			prop: 'color',
			state: 'disabled',
			variant: 'outline-primary',
		}),
		color('--btn-outline-primary-disabled-border-color', 'Outline · border', palette.gray300, {
			prop: 'border-color',
			state: 'disabled',
			variant: 'outline-primary',
		}),

		// --- Shape and focus ------------------------------------------------------------------
		{
			cssVar: '--btn-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--btn-padding-x',
			label: 'Padding · horizontal',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--btn-padding-y',
			label: 'Padding · vertical',
			type: 'length',
			value: '0.4375rem',
		},
		{
			cssVar: '--btn-font-weight',
			label: 'Font weight',
			type: 'number',
			value: '600',
		},
		{
			cssVar: '--btn-focus-box-shadow',
			description:
				'Clay draws focus as a ring rather than a colour swap, so this is a shadow, not a fill.',
			label: 'Focus ring',
			type: 'shadow',
			value: `0 0 0 0.125rem ${palette.white}, 0 0 0 0.25rem ${palette.blue300}`,
		},
	],
};
