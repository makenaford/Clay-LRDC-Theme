const CAPABILITIES = [
	{body: 'Ground answers in your own content, not the open web.', glyph: 'AI', title: 'AI Assistants'},
	{body: 'One library for every asset across every site.', glyph: 'DA', title: 'Digital Assets'},
	{body: 'B2B catalogues, contract pricing and self-service.', glyph: 'CO', title: 'Commerce'},
	{body: 'Ship internal tools without a release train.', glyph: 'LC', title: 'Low-Code'},
	{body: 'Author once, publish to every channel.', glyph: 'CM', title: 'Content Management'},
	{body: 'Federated search across every connected system.', glyph: 'SE', title: 'Search'},
	{body: 'Segment audiences and tailor each experience.', glyph: 'PE', title: 'Personalization'},
	{body: 'SSO, granular permissions and audit trails.', glyph: 'SC', title: 'Security'},
];

/**
 * Capability grid — the eight-tile block.
 *
 * The tiles are Clay cards, so their surface, border and radius are the Card component's tokens.
 * Only the section framing and the icon chip belong to this pattern.
 */
export function CapabilityGrid() {
	return (
		<section className="lw-capability">
			<div className="lw-container">
				<h2 className="lw-capability__heading">
					One platform, eight ways to build on it
				</h2>

				<div className="lw-capability__grid">
					{CAPABILITIES.map((capability) => (
						<article className="card lw-capability__card" key={capability.title}>
							<div className="card-body">
								<span className="lw-capability__icon">
									{capability.glyph}
								</span>

								<h5 className="card-title">{capability.title}</h5>

								<p className="card-text">{capability.body}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
