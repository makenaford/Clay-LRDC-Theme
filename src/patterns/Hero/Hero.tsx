import ClayButton from '@clayui/button';

/** Hero — the "Launch Digital Experiences" block at the top of liferay.com. */
export function Hero() {
	return (
		<section className="lw-hero">
			<div className="lw-container lw-hero__inner">
				<p className="lw-hero__eyebrow">Digital Experience Platform</p>

				<h1 className="lw-hero__heading">
					Launch Digital Experiences That Convert, Scale, and Grow
				</h1>

				<p className="lw-hero__body">
					Build portals, intranets, websites and commerce on one platform — and
					change them without waiting on a release train.
				</p>

				<div className="lw-hero__actions">
					<ClayButton displayType="primary">Book a Demo</ClayButton>

					<ClayButton
						className="lw-hero__ghost"
						displayType="primary"
						outline
					>
						Start Free Trial
					</ClayButton>
				</div>

				<p className="lw-hero__rating">
					★★★★★ 4.4 / 5 — Gartner Peer Insights, 300+ reviews
				</p>
			</div>
		</section>
	);
}
