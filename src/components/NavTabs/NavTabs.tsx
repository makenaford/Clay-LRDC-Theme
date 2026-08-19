import type {ComponentSpec} from '../spec';
import {navTabsTokens} from './NavTabs.tokens';

/** Tabs — the strip that drives the solutions carousel on the homepage. */
export const navTabsSpec: ComponentSpec = {
	gallery: () => (
		<ul className="nav nav-tabs">
			<li className="nav-item">
				<a className="nav-link active" href="#customer-portals">
					Customer Portals
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href="#supplier-portals">
					Supplier Portals
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href="#intranets">
					Intranets
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link disabled" href="#partner-portals">
					Partner Portals
				</a>
			</li>
		</ul>
	),

	tokens: navTabsTokens,

	variants: [
		{
			id: 'tab',
			label: 'Tab',
			render: ({disabled}) => (
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a
							className={`nav-link${disabled ? ' disabled' : ''}`}
							href="#tab"
						>
							Customer Portals
						</a>
					</li>
				</ul>
			),
		},
	],
};
