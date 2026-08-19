import type {ComponentSpec} from '../spec';
import {cardTokens} from './Card.tokens';

/**
 * Card.
 *
 * Written with Clay's CSS classes rather than `@clayui/card`'s React components: the homepage cards
 * are a plain surface + body + link, and the class-based form keeps the markup readable while still
 * being driven entirely by Clay's `--card-*` tokens.
 */
export const cardSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-grid-3">
			<article className="card">
				<div className="card-body">
					<h5 className="card-title">Digital Asset Management</h5>

					<p className="card-text">
						Store, organise and reuse every asset across your sites from one
						library.
					</p>

					<a className="card-link" href="#dam">
						Explore DAM
					</a>
				</div>
			</article>

			<article className="card">
				<div className="card-body">
					<h5 className="card-title">Low-Code Development</h5>

					<p className="card-text">
						Ship internal tools and customer apps without waiting on a release
						train.
					</p>

					<a className="card-link" href="#low-code">
						Explore Low-Code
					</a>
				</div>
			</article>

			<article className="card">
				<div className="card-header">Featured</div>

				<div className="card-body">
					<h5 className="card-title">Personalization</h5>

					<p className="card-text">
						Segment audiences and tailor every experience to them.
					</p>

					<a className="card-link" href="#personalization">
						Explore Personalization
					</a>
				</div>

				<div className="card-footer">Updated this quarter</div>
			</article>
		</div>
	),

	tokens: cardTokens,

	variants: [
		{
			id: 'card',
			label: 'Surface',
			render: () => (
				<article className="card" style={{maxWidth: '18rem'}}>
					<div className="card-body">
						<h5 className="card-title">Digital Asset Management</h5>

						<p className="card-text">
							One library for every asset across your sites.
						</p>
					</div>
				</article>
			),
		},
		{
			id: 'card-link',
			label: 'Card link',
			render: () => (
				<a className="card-link" href="#link">
					Explore DAM
				</a>
			),
		},
	],
};
