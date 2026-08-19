import ClayBadge from '@clayui/badge';

import type {ComponentSpec} from '../spec';
import {badgeTokens} from './Badge.tokens';

/** Badge — the eyebrow labels on liferay.com's resource cards. */
export const badgeSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-row">
			<ClayBadge displayType="primary" label="Ebook" />

			<ClayBadge displayType="secondary" label="Guide" />

			<ClayBadge displayType="success" label="New" />
		</div>
	),

	tokens: badgeTokens,

	variants: [
		{
			id: 'primary',
			label: 'Primary',
			render: () => <ClayBadge displayType="primary" label="Ebook" />,
		},
		{
			id: 'secondary',
			label: 'Secondary',
			render: () => <ClayBadge displayType="secondary" label="Guide" />,
		},
	],
};
