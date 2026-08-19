import ClayBadge from '@clayui/badge';

const RESOURCES = [
	{kind: 'Ebook', meta: '12 min read', title: 'The B2B Buyer Portal Playbook', type: 'primary'},
	{kind: 'Guide', meta: '8 min read', title: 'Choosing a DXP in 2026', type: 'secondary'},
	{kind: 'Report', meta: '20 min read', title: 'Gartner Magic Quadrant for DXP', type: 'primary'},
	{kind: 'Webinar', meta: '45 min', title: 'Migrating Off Legacy Portals', type: 'secondary'},
	{kind: 'Ebook', meta: '15 min read', title: 'AI That Answers From Your Content', type: 'primary'},
	{kind: 'Guide', meta: '6 min read', title: 'Intranet Adoption Benchmarks', type: 'secondary'},
] as const;

/** Resource grid — the trending content block above the footer. */
export function ResourceGrid() {
	return (
		<section className="lw-resource">
			<div className="lw-container">
				<h2 className="lw-resource__heading">Trending resources</h2>

				<div className="lw-resource__grid">
					{RESOURCES.map((resource) => (
						<article className="card lw-resource__card" key={resource.title}>
							<div className="lw-resource__thumb" role="presentation" />

							<div className="card-body">
								<ClayBadge
									displayType={resource.type}
									label={resource.kind}
								/>

								<h5 className="card-title lw-resource__title">
									{resource.title}
								</h5>

								<p className="lw-resource__meta">{resource.meta}</p>

								<a className="card-link" href="#resource">
									Read now
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
