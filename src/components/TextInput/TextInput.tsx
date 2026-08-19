import type {ComponentSpec} from '../spec';
import {textInputTokens} from './TextInput.tokens';

/**
 * Text input.
 *
 * The state matrix for this one is worth reading closely: it shows default, focus and disabled but
 * no hover, because Clay defines no `--input-hover-*` family. The matrix reflects what Clay actually
 * styles rather than padding the grid out with states that do not exist.
 */
export const textInputSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-stack" style={{maxWidth: '22rem'}}>
			<div className="form-group">
				<label className="control-label" htmlFor="lw-demo-email">
					Work email
				</label>

				<input
					className="form-control"
					defaultValue="makena.ford@liferay.com"
					id="lw-demo-email"
					type="email"
				/>
			</div>

			<div className="form-group">
				<label className="control-label" htmlFor="lw-demo-company">
					Company
				</label>

				<input
					className="form-control"
					id="lw-demo-company"
					placeholder="Acme Corp"
					type="text"
				/>
			</div>

			<div className="form-group">
				<label className="control-label" htmlFor="lw-demo-locked">
					Region (locked)
				</label>

				<input
					className="form-control"
					defaultValue="EMEA"
					disabled
					id="lw-demo-locked"
					type="text"
				/>
			</div>
		</div>
	),

	tokens: textInputTokens,

	variants: [
		{
			id: 'input',
			label: 'Field',
			render: ({disabled}) => (
				<input
					className="form-control"
					defaultValue="makena.ford@liferay.com"
					disabled={disabled}
					readOnly
					style={{maxWidth: '15rem'}}
					type="text"
				/>
			),
		},
	],
};
