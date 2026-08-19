/**
 * The token model.
 *
 * A token is a thin wrapper around one real Clay CSS custom property. We deliberately do not invent
 * our own naming scheme: `cssVar` is always a property Clay's compiled stylesheet actually reads,
 * so setting it is enough to restyle the component — no overriding selectors, no `!important`.
 */

/** The interaction states Clay models for its interactive components. */
export type InteractionState =
	| 'default'
	| 'hover'
	| 'focus'
	| 'active'
	| 'disabled';

export const INTERACTION_STATES: InteractionState[] = [
	'default',
	'hover',
	'focus',
	'active',
	'disabled',
];

/** Drives which editor control the workbench renders for a token. */
export type TokenType = 'color' | 'length' | 'shadow' | 'number' | 'text';

export interface Token {
	/** The real Clay custom property, e.g. `--btn-primary-hover-background-color`. */
	cssVar: string;

	/** Human label shown in the token editor. */
	label: string;

	/** The value this repo ships as its default. */
	value: string;

	type: TokenType;

	/**
	 * The three fields below are what let the workbench preview a state without simulating a
	 * pointer. If a token is (variant: 'primary', prop: 'background-color', state: 'hover'), the
	 * workbench knows its sibling default token is (primary, background-color, default) — so it can
	 * render a static "hover" swatch by assigning the hover value onto the default property.
	 * Leave them off for tokens that are not part of a state family (padding, radius, font size).
	 */
	variant?: string;
	prop?: string;
	state?: InteractionState;

	/** Optional note surfaced next to the control. */
	description?: string;
}

export type TokenSetKind = 'global' | 'component' | 'pattern';

export interface TokenSet {
	/** Stable id, used in the workbench URL hash and as the storage key. */
	id: string;
	label: string;
	kind: TokenSetKind;
	description: string;
	tokens: Token[];
}

/** A flat `{'--var': 'value'}` map — what actually gets written to the DOM. */
export type TokenValues = Record<string, string>;

/** Convenience for building token lists without repeating `type: 'color'` on every entry. */
export function color(
	cssVar: string,
	label: string,
	value: string,
	extra: Partial<Token> = {}
): Token {
	return {cssVar, label, type: 'color', value, ...extra};
}
