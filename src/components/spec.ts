import type {ReactNode} from 'react';

import type {TokenSet} from '../tokens/types';

/**
 * What the workbench needs from a component in order to document it.
 *
 * `variants` drive the state matrix, so their ids must match the `variant` field used on that
 * component's tokens — that pairing is what lets the matrix look up the right hover or disabled
 * value for each row. `gallery` is free-form and only has to look like the real thing.
 */
export interface ComponentSpec {
	tokens: TokenSet;

	/** One row per variant in the state matrix. */
	variants: Array<{
		id: string;
		label: string;
		render: (state: {disabled: boolean}) => ReactNode;
	}>;

	/** The "what does this look like in context" panel above the matrix. */
	gallery: () => ReactNode;
}
