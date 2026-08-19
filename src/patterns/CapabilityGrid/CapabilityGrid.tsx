import {Icon} from '../../icons/Icon';
import type {IconName} from '../../icons/registry';

const CAPABILITIES: Array<{body: string; icon: IconName; title: string}> = [
	{
		body: 'Ground answers in your own content, not the open web.',
		icon: 'lrdc-ai',
		title: 'AI Assistants',
	},
	{
		body: 'One library for every asset across every site.',
		icon: 'lrdc-assets',
		title: 'Digital Assets',
	},
	{
		body: 'B2B catalogues, contract pricing and self-service.',
		icon: 'lrdc-commerce',
		title: 'Commerce',
	},
	{
		body: 'Ship internal tools without a release train.',
		icon: 'lrdc-low-code',
		title: 'Low-Code',
	},
	{
		body: 'Author once, publish to every channel.',
		icon: 'lrdc-content',
		title: 'Content Management',
	},
	{
		body: 'Federated search across every connected system.',
		icon: 'lrdc-search',
		title: 'Search',
	},
	{
		body: 'Segment audiences and tailor each experience.',
		icon: 'lrdc-personalization',
		title: 'Personalization',
	},
	{
		body: 'SSO, granular permissions and audit trails.',
		icon: 'lrdc-security',
		title: 'Security',
	},
];

/**
 * Capability grid — the eight-tile block.
 *
 * The tiles are Clay cards, so their surface, border and radius are the Card component's tokens.
 * Only the section framing and the icon chip belong to this pattern.
 *
 * The icons are decorative here — each sits beside a heading that already says the same thing — so
 * they are left as Clay renders them (`role="presentation"`) with no added label. Repeating the
 * title to a screen reader would be noise, not help.
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
									<Icon name={capability.icon} />
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
