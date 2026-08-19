import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Text input tokens.
 *
 * Inputs are the one place where Clay's state family is focus-led rather than hover-led: there is a
 * full `--input-focus-*` set but no `--input-hover-*`. The state matrix therefore shows default,
 * focus and disabled, and skips hover and active because Clay genuinely does not style them.
 */
export const textInputTokens: TokenSet = {
	description:
		'Form fields with their focus and disabled states, plus the label and helper text colours.',
	id: 'text-input',
	kind: 'component',
	label: 'Text input',
	tokens: [
		color('--input-background-color', 'Background', palette.white, {
			prop: 'background-color',
			state: 'default',
			variant: 'input',
		}),
		color('--input-color', 'Text', palette.gray900, {
			prop: 'color',
			state: 'default',
			variant: 'input',
		}),
		color('--input-border-color', 'Border', palette.gray300, {
			prop: 'border-color',
			state: 'default',
			variant: 'input',
		}),
		color('--input-focus-background-color', 'Background', palette.white, {
			prop: 'background-color',
			state: 'focus',
			variant: 'input',
		}),
		color('--input-focus-color', 'Text', palette.gray900, {
			prop: 'color',
			state: 'focus',
			variant: 'input',
		}),
		color('--input-focus-border-color', 'Border', palette.blue500, {
			prop: 'border-color',
			state: 'focus',
			variant: 'input',
		}),
		color('--input-disabled-bg', 'Background', palette.gray100, {
			prop: 'background-color',
			state: 'disabled',
			variant: 'input',
		}),
		color('--input-disabled-color', 'Text', palette.gray400, {
			prop: 'color',
			state: 'disabled',
			variant: 'input',
		}),
		color('--input-disabled-border-color', 'Border', palette.gray200, {
			prop: 'border-color',
			state: 'disabled',
			variant: 'input',
		}),
		color('--input-label-color', 'Label', palette.gray700),
		color('--input-label-focus-color', 'Label · focus', palette.blue600),
		color('--input-danger-border-color', 'Error · border', palette.danger),
		color('--input-danger-color', 'Error · text', palette.danger),
		{
			cssVar: '--input-focus-box-shadow',
			description: 'The focus ring. Clay layers this on top of the focus border colour.',
			label: 'Focus ring',
			type: 'shadow',
			value: `0 0 0 0.125rem ${palette.blue200}`,
		},
		{
			cssVar: '--input-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--input-height',
			label: 'Height',
			type: 'length',
			value: '2.375rem',
		},
		{
			cssVar: '--input-font-size',
			label: 'Font size',
			type: 'length',
			value: '0.875rem',
		},
	],
};
