import type {ComponentSpec} from '../spec';
import {dropDownTokens} from './DropDown.tokens';

/**
 * Dropdown.
 *
 * Rendered as a permanently-open menu rather than a real popover. A dropdown that closes when it
 * loses focus is impossible to inspect while you are editing its tokens in the panel next to it, so
 * the workbench shows the open state and lets you style it in place. The markup and classes are the
 * same ones `@clayui/drop-down` emits.
 */
export const dropDownSpec: ComponentSpec = {
	gallery: () => (
		<div className="dropdown-menu show" style={{maxWidth: '17rem', position: 'static'}}>
			<div className="dropdown-header">Platform</div>

			<a className="dropdown-item active" href="#dxp">
				Liferay DXP
			</a>

			<a className="dropdown-item" href="#cloud">
				Liferay Cloud
			</a>

			<a className="dropdown-item" href="#analytics">
				Analytics Cloud
			</a>

			<div className="dropdown-divider" />

			<div className="dropdown-header">Solutions</div>

			<a className="dropdown-item" href="#portals">
				Customer Portals
			</a>

			<a className="dropdown-item disabled" href="#commerce">
				Digital Commerce (coming soon)
			</a>
		</div>
	),

	tokens: dropDownTokens,

	variants: [
		{
			id: 'item',
			label: 'Menu item',
			render: ({disabled}) => (
				<div
					className="dropdown-menu show"
					style={{minWidth: '12rem', position: 'static'}}
				>
					<a
						className={`dropdown-item${disabled ? ' disabled' : ''}`}
						href="#item"
					>
						Liferay DXP
					</a>
				</div>
			),
		},
	],
};
