import ClayButton from '@clayui/button';

import type {ComponentSpec} from '../spec';
import {buttonTokens} from './Button.tokens';

/**
 * Button. Clay's own component, unwrapped — the variants below are Clay `displayType`s, and every
 * colour they paint with comes from the tokens in `Button.tokens.ts`.
 */
export const buttonSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-row">
			<ClayButton displayType="primary">Book a Demo</ClayButton>

			<ClayButton displayType="secondary">Contact Sales</ClayButton>

			<ClayButton displayType="primary" outline>
				Start Free Trial
			</ClayButton>

			<ClayButton disabled displayType="primary">
				Unavailable
			</ClayButton>
		</div>
	),

	tokens: buttonTokens,

	variants: [
		{
			id: 'primary',
			label: 'Primary',
			render: ({disabled}) => (
				<ClayButton disabled={disabled} displayType="primary">
					Book a Demo
				</ClayButton>
			),
		},
		{
			id: 'secondary',
			label: 'Secondary',
			render: ({disabled}) => (
				<ClayButton disabled={disabled} displayType="secondary">
					Contact Sales
				</ClayButton>
			),
		},
		{
			id: 'outline-primary',
			label: 'Outline',

			// `outline` is Clay's own modifier prop — it emits `btn-outline-primary`, which is
			// the class the `--btn-outline-primary-*` tokens are attached to.
			render: ({disabled}) => (
				<ClayButton disabled={disabled} displayType="primary" outline>
					Start Free Trial
				</ClayButton>
			),
		},
	],
};
