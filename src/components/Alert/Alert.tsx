import type {ComponentSpec} from '../spec';
import {alertTokens} from './Alert.tokens';

/**
 * Alert.
 *
 * Uses Clay's alert classes directly rather than `@clayui/alert`, whose React component insists on
 * an icon spritemap. Nothing about the tokens changes — `--alert-*` is read by the CSS either way.
 */
export const alertSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-stack">
			<div className="alert alert-info" role="alert">
				Your trial environment is provisioning and will be ready shortly.
			</div>

			<div className="alert alert-success" role="alert">
				Deployment finished successfully.
			</div>

			<div className="alert alert-warning" role="alert">
				This subscription renews in 14 days.
			</div>

			<div className="alert alert-danger" role="alert">
				We could not reach the search index.
			</div>
		</div>
	),

	tokens: alertTokens,

	variants: [
		{
			id: 'info',
			label: 'Info',
			render: () => (
				<div className="alert alert-info" role="alert">
					Trial environment provisioning.
				</div>
			),
		},
		{
			id: 'success',
			label: 'Success',
			render: () => (
				<div className="alert alert-success" role="alert">
					Deployment finished.
				</div>
			),
		},
	],
};
