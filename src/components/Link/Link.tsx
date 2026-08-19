import ClayLink from '@clayui/link';

import type {ComponentSpec} from '../spec';
import {linkTokens} from './Link.tokens';

/** Link. */
export const linkSpec: ComponentSpec = {
	gallery: () => (
		<p style={{margin: 0}}>
			Liferay DXP powers{' '}
			<ClayLink href="#customer-portals">customer portals</ClayLink>,{' '}
			<ClayLink displayType="primary" href="#intranets">
				intranets
			</ClayLink>{' '}
			and{' '}
			<ClayLink displayType="secondary" href="#commerce">
				digital commerce
			</ClayLink>
			.
		</p>
	),

	tokens: linkTokens,

	variants: [
		{
			id: 'default',
			label: 'Default',
			render: () => <ClayLink href="#default">Read the story</ClayLink>,
		},
		{
			id: 'primary',
			label: 'Primary',
			render: () => (
				<ClayLink displayType="primary" href="#primary">
					Read the story
				</ClayLink>
			),
		},
		{
			id: 'secondary',
			label: 'Secondary',
			render: () => (
				<ClayLink displayType="secondary" href="#secondary">
					Read the story
				</ClayLink>
			),
		},
	],
};
