import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Alert tokens. Clay models alerts purely by semantic variant with no interaction states, so this
 * set is a colour matrix: background / border / text for each of info, success, warning and danger.
 */
export const alertTokens: TokenSet = {
	description: 'Inline notifications, one colour trio per semantic variant.',
	id: 'alert',
	kind: 'component',
	label: 'Alert',
	tokens: [
		color('--alert-info-background-color', 'Info · background', palette.blue50),
		color('--alert-info-border-color', 'Info · border', palette.blue200),
		color('--alert-info-color', 'Info · text', palette.info),
		color('--alert-success-background-color', 'Success · background', '#e8f5ed'),
		color('--alert-success-border-color', 'Success · border', palette.successLight),
		color('--alert-success-color', 'Success · text', palette.success),
		color('--alert-warning-background-color', 'Warning · background', '#fdf4e8'),
		color('--alert-warning-border-color', 'Warning · border', '#f5b16b'),
		color('--alert-warning-color', 'Warning · text', palette.warning),
		color('--alert-danger-background-color', 'Danger · background', '#fdeaea'),
		color('--alert-danger-border-color', 'Danger · border', '#f7a8a8'),
		color('--alert-danger-color', 'Danger · text', palette.danger),
		{
			cssVar: '--alert-border-radius',
			label: 'Corner radius',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--alert-border-width',
			label: 'Border width',
			type: 'length',
			value: '1px',
		},
		{
			cssVar: '--alert-padding-x',
			label: 'Padding · horizontal',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--alert-padding-y',
			label: 'Padding · vertical',
			type: 'length',
			value: '0.75rem',
		},
	],
};
