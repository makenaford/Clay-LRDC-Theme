const CUSTOMERS = ['AT&T', 'Lenovo', 'Broadcom', 'HP', 'Vodafone', 'Airbus'];

/** Logo bar — the customer proof strip. */
export function LogoBar() {
	return (
		<section className="lw-logobar">
			<div className="lw-container">
				<p className="lw-logobar__label">
					Trusted by teams running mission-critical digital experiences
				</p>

				<ul className="lw-logobar__list">
					{CUSTOMERS.map((name) => (
						<li className="lw-logobar__logo" key={name}>
							{name}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
