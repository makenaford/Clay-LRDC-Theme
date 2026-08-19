import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

import {allTokenSets} from '../tokens/registry';
import type {TokenValues} from '../tokens/types';

/**
 * Holds every token's current value and writes it to the document.
 *
 * Because Clay reads these properties directly, writing them to `:root` is the entire theming
 * mechanism — there is no stylesheet regeneration and no re-render of the previews. Edits land on
 * the next paint.
 */

const STORAGE_KEY = 'clay-lrdc-theme:tokens';

/** Every token's shipped default, flattened across all sets. */
function defaultValues(): TokenValues {
	const values: TokenValues = {};

	for (const set of allTokenSets) {
		for (const token of set.tokens) {
			values[token.cssVar] = token.value;
		}
	}

	return values;
}

interface TokenStore {
	/** Current value of every token, keyed by CSS custom property. */
	values: TokenValues;

	setValue: (cssVar: string, value: string) => void;

	/** Restore one set to its shipped defaults. */
	resetSet: (setId: string) => void;

	resetAll: () => void;

	/** Only the tokens edited away from their defaults — this is what export writes out. */
	edits: TokenValues;
}

const TokenStoreContext = createContext<TokenStore | null>(null);

export function TokenStoreProvider({children}: {children: ReactNode}) {
	const defaults = useMemo(defaultValues, []);

	const [values, setValues] = useState<TokenValues>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (!stored) {
			return defaults;
		}

		try {
			const parsed = JSON.parse(stored) as TokenValues;

			// Keep only tokens that still exist. A stored theme outlives the token files around
			// it — rename or delete a token and its old value would otherwise sit in storage
			// forever, get written to :root on every load, and show up in exports as a property
			// no component reads. Merging rather than replacing covers the other direction: a
			// token added since the theme was saved keeps its shipped default.
			const known: TokenValues = {};

			for (const [cssVar, value] of Object.entries(parsed)) {
				if (cssVar in defaults) {
					known[cssVar] = value;
				}
			}

			return {...defaults, ...known};
		}
		catch {
			return defaults;
		}
	});

	// One write per changed property, straight onto :root.
	useEffect(() => {
		const root = document.documentElement;

		for (const [cssVar, value] of Object.entries(values)) {
			root.style.setProperty(cssVar, value);
		}
	}, [values]);

	const edits = useMemo(() => {
		const changed: TokenValues = {};

		for (const [cssVar, value] of Object.entries(values)) {
			if (defaults[cssVar] !== value) {
				changed[cssVar] = value;
			}
		}

		return changed;
	}, [defaults, values]);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
	}, [edits]);

	const setValue = useCallback((cssVar: string, value: string) => {
		setValues((current) => ({...current, [cssVar]: value}));
	}, []);

	const resetSet = useCallback(
		(setId: string) => {
			const set = allTokenSets.find((candidate) => candidate.id === setId);

			if (!set) {
				return;
			}

			setValues((current) => {
				const next = {...current};

				for (const token of set.tokens) {
					next[token.cssVar] = token.value;

					// Clear the inline property too, so the value falls back to Clay's own
					// default rather than lingering as an override.
					document.documentElement.style.removeProperty(token.cssVar);
				}

				return next;
			});
		},
		[]
	);

	const resetAll = useCallback(() => {
		for (const cssVar of Object.keys(defaults)) {
			document.documentElement.style.removeProperty(cssVar);
		}

		setValues(defaults);
	}, [defaults]);

	const store = useMemo(
		() => ({edits, resetAll, resetSet, setValue, values}),
		[edits, resetAll, resetSet, setValue, values]
	);

	return (
		<TokenStoreContext.Provider value={store}>
			{children}
		</TokenStoreContext.Provider>
	);
}

export function useTokenStore(): TokenStore {
	const store = useContext(TokenStoreContext);

	if (!store) {
		throw new Error('useTokenStore must be used inside a TokenStoreProvider');
	}

	return store;
}
