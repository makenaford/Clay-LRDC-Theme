import ClayButton from '@clayui/button';

/** Case study — the Vodafone Business story block. */
export function CaseStudy() {
	return (
		<section className="lw-case">
			<div className="lw-container lw-case__inner">
				<div className="lw-case__media" role="presentation">
					<span>Customer story</span>
				</div>

				<div className="lw-case__copy">
					<h2 className="lw-case__heading">
						Vodafone Business rebuilt its partner experience
					</h2>

					<p className="lw-case__body">
						One portal replaced four disconnected tools, and partners stopped
						filing tickets to find documents.
					</p>

					<p className="lw-case__quote">
						“We shipped in months what we had been planning for years.”
					</p>

					<dl className="lw-case__metrics">
						<div>
							<dt>Support tickets</dt>

							<dd>−38%</dd>
						</div>

						<div>
							<dt>Partner onboarding</dt>

							<dd>3× faster</dd>
						</div>
					</dl>

					<ClayButton className="lw-case__cta" displayType="primary" outline>
						Read the story
					</ClayButton>
				</div>
			</div>
		</section>
	);
}
