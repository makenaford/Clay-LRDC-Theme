import {useState} from 'react';

import ClayButton from '@clayui/button';

const SOLUTIONS = [
	{
		body: 'Give customers one place to raise a ticket, pay an invoice and track an order — without calling support.',
		id: 'customer-portals',
		label: 'Customer Portals',
	},
	{
		body: 'Onboard suppliers, publish requirements and collect documents against a single source of truth.',
		id: 'supplier-portals',
		label: 'Supplier Portals',
	},
	{
		body: 'Run a marketing site and a logged-in experience from one platform, with one content model.',
		id: 'enterprise-websites',
		label: 'Enterprise Websites',
	},
	{
		body: 'Bring news, policies, tooling and search into one place employees actually visit.',
		id: 'intranets',
		label: 'Intranets',
	},
	{
		body: 'Sell B2B with contract pricing, approval flows and self-service reordering.',
		id: 'digital-commerce',
		label: 'Digital Commerce',
	},
];

/**
 * Solutions — the homepage carousel, rebuilt as tabs.
 *
 * A carousel and a tab strip are the same pattern with different affordances, and tabs are the
 * version you can actually inspect while editing tokens: the selected state stays put instead of
 * rotating away mid-edit.
 */
export function SolutionsTabs() {
	const [selected, setSelected] = useState(SOLUTIONS[0].id);

	const active = SOLUTIONS.find((solution) => solution.id === selected) ?? SOLUTIONS[0];

	return (
		<section className="lw-solutions">
			<div className="lw-container">
				<h2 className="lw-solutions__heading">Built for what you are launching</h2>

				<ul className="nav nav-tabs" role="tablist">
					{SOLUTIONS.map((solution) => (
						<li className="nav-item" key={solution.id} role="presentation">
							<button
								aria-selected={solution.id === selected}
								className={`nav-link${solution.id === selected ? ' active' : ''}`}
								onClick={() => setSelected(solution.id)}
								role="tab"
								type="button"
							>
								{solution.label}
							</button>
						</li>
					))}
				</ul>

				<div className="lw-solutions__panel" role="tabpanel">
					<h3 className="lw-solutions__panel-heading">{active.label}</h3>

					<p className="lw-solutions__panel-body">{active.body}</p>

					<ClayButton displayType="primary" size="sm">
						Explore {active.label}
					</ClayButton>
				</div>
			</div>
		</section>
	);
}
