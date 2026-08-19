const COLUMNS = [
	{
		links: ['Liferay DXP', 'Liferay Cloud', 'Analytics Cloud', 'Commerce'],
		title: 'Products',
	},
	{
		links: ['Customer Portals', 'Supplier Portals', 'Intranets', 'Websites'],
		title: 'Solutions',
	},
	{
		links: ['Documentation', 'Developer Hub', 'Community', 'Training'],
		title: 'Resources',
	},
	{
		links: ['About', 'Careers', 'Newsroom', 'Contact'],
		title: 'Company',
	},
];

/** Site footer. */
export function SiteFooter() {
	return (
		<footer className="lw-footer">
			<div className="lw-container">
				<div className="lw-footer__columns">
					{COLUMNS.map((column) => (
						<div className="lw-footer__column" key={column.title}>
							<h3 className="lw-footer__heading">{column.title}</h3>

							<ul className="lw-footer__list">
								{column.links.map((link) => (
									<li key={link}>
										<a
											className="lw-footer__link"
											href="#footer"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="lw-footer__legal">
					<span>© 2026 Liferay, Inc. All rights reserved.</span>

					<span>
						<a className="lw-footer__link" href="#privacy">
							Privacy
						</a>

						<a className="lw-footer__link" href="#terms">
							Terms
						</a>

						<a className="lw-footer__link" href="#cookies">
							Cookie Preferences
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
