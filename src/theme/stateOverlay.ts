import type {InteractionState, TokenSet, TokenValues} from '../tokens/types';

/**
 * Renders an interaction state as a static swatch.
 *
 * The workbench needs to show hover, active and disabled side by side, but you cannot force `:hover`
 * on an element from script — and simulating it with a `.is-hover` class would mean re-declaring
 * every Clay rule ourselves, which is exactly the duplication this repo exists to avoid.
 *
 * Instead we exploit the token naming. A token tagged (variant: 'primary', prop: 'background-color',
 * state: 'hover') has a sibling tagged (primary, background-color, default). Assigning the hover
 * token's *value* onto the default token's *property* makes the resting element paint itself in its
 * own hover colours, using Clay's untouched stylesheet. The preview is therefore always driven by
 * the same tokens the real state uses — it cannot drift from what a genuine pointer hover produces.
 *
 * Returns an empty map for `default`, and for any state a component does not define (Clay has no
 * hover state for inputs, no active state for links), which is what makes the matrix able to skip
 * cells honestly rather than inventing them.
 */
export function stateOverlay(
	set: TokenSet,
	state: InteractionState,
	values: TokenValues
): TokenValues {
	if (state === 'default') {
		return {};
	}

	const overlay: TokenValues = {};

	for (const token of set.tokens) {
		if (token.state !== state || !token.variant || !token.prop) {
			continue;
		}

		const base = set.tokens.find(
			(candidate) =>
				candidate.state === 'default' &&
				candidate.variant === token.variant &&
				candidate.prop === token.prop
		);

		if (base) {
			overlay[base.cssVar] = values[token.cssVar] ?? token.value;
		}
	}

	return overlay;
}

/** The states a component actually defines, in canonical order. Used to build the matrix columns. */
export function definedStates(set: TokenSet): InteractionState[] {
	const order: InteractionState[] = ['default', 'hover', 'focus', 'active', 'disabled'];

	return order.filter(
		(state) =>
			state === 'default' || set.tokens.some((token) => token.state === state)
	);
}
