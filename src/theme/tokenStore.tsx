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
import {THEME_MODES, type ThemeMode, type TokenValues} from '../tokens/types';

/**
 * Holds every token's current value, per theme, and writes the active theme to the document.
 *
 * Because Clay reads these properties directly, writing them to `:root` is the entire theming
 * mechanism — no stylesheet regeneration, no re-render of the previews. Edits land on the next
 * paint, and so does a theme switch.
 */

const STORAGE_KEY = 'clay-lrdc-theme:tokens';

/** Dark is the default theme, so it is what a first-time visitor gets. */
const DEFAULT_MODE: ThemeMode = 'dark';

type ModeValues = Record<ThemeMode, TokenValues>;

/** Every token's shipped defaults, flattened per mode. */
function defaultValues(): ModeValues {
	const light: TokenValues = {};
	const dark: TokenValues = {};

	for (const set of allTokenSets) {
		for (const token of set.tokens) {
			light[token.cssVar] = token.value;

			// A token with no dark value is theme-independent — same number either way.
			dark[token.cssVar] = token.dark ?? token.value;
		}
	}

	return {dark, light};
}

interface StoredTheme {
	edits: Partial<ModeValues>;
	mode: ThemeMode;
}

interface TokenStore {
	/** The theme currently being previewed and edited. */
	mode: ThemeMode;

	setMode: (mode: ThemeMode) => void;

	/** Current values for the active mode, keyed by CSS custom property. */
	values: TokenValues;

	/** Current values for both modes — what export needs. */
	allValues: ModeValues;

	setValue: (cssVar: string, value: string) => void;

	/** Restore one set to its shipped defaults, in the active mode only. */
	resetSet: (setId: string) => void;

	resetAll: () => void;

	/** Tokens edited away from their defaults in the active mode. */
	edits: TokenValues;

	/** Edits in both modes. */
	allEdits: ModeValues;
}

const TokenStoreContext = createContext<TokenStore | null>(null);

function diff(current: TokenValues, defaults: TokenValues): TokenValues {
	const changed: TokenValues = {};

	for (const [cssVar, value] of Object.entries(current)) {
		if (defaults[cssVar] !== value) {
			changed[cssVar] = value;
		}
	}

	return changed;
}

export function TokenStoreProvider({children}: {children: ReactNode}) {
	const defaults = useMemo(defaultValues, []);

	const [mode, setMode] = useState<ThemeMode>(DEFAULT_MODE);

	const [values, setValues] = useState<ModeValues>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (!stored) {
			return defaults;
		}

		try {
			const parsed = JSON.parse(stored) as StoredTheme;

			// Anything that is not the current shape — including themes saved before this repo
			// had two modes — is discarded rather than half-migrated.
			if (!parsed || typeof parsed !== 'object' || !parsed.edits) {
				return defaults;
			}

			const merged: ModeValues = {dark: {...defaults.dark}, light: {...defaults.light}};

			for (const themeMode of THEME_MODES) {
				const edits = parsed.edits[themeMode];

				if (!edits) {
					continue;
				}

				// Keep only tokens that still exist. A stored theme outlives the token files
				// around it — rename or delete a token and its old value would otherwise sit in
				// storage forever, get written to :root on every load, and show up in exports as
				// a property no component reads.
				for (const [cssVar, value] of Object.entries(edits)) {
					if (cssVar in defaults[themeMode]) {
						merged[themeMode][cssVar] = value;
					}
				}
			}

			return merged;
		}
		catch {
			return defaults;
		}
	});

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (!stored) {
			return;
		}

		try {
			const parsed = JSON.parse(stored) as StoredTheme;

			if (parsed?.mode && THEME_MODES.includes(parsed.mode)) {
				setMode(parsed.mode);
			}
		}
		catch {
			// Leave the default mode in place.
		}
	}, []);

	// One write per property, straight onto :root. `data-theme` goes on the same element so CSS
	// that needs to branch on the theme — rather than just read a token — can do so.
	useEffect(() => {
		const root = document.documentElement;

		root.dataset.theme = mode;

		for (const [cssVar, value] of Object.entries(values[mode])) {
			root.style.setProperty(cssVar, value);
		}
	}, [mode, values]);

	const allEdits = useMemo(
		() => ({
			dark: diff(values.dark, defaults.dark),
			light: diff(values.light, defaults.light),
		}),
		[defaults, values]
	);

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({edits: allEdits, mode} satisfies StoredTheme)
		);
	}, [allEdits, mode]);

	const setValue = useCallback(
		(cssVar: string, value: string) => {
			setValues((current) => ({
				...current,
				[mode]: {...current[mode], [cssVar]: value},
			}));
		},
		[mode]
	);

	const resetSet = useCallback(
		(setId: string) => {
			const set = allTokenSets.find((candidate) => candidate.id === setId);

			if (!set) {
				return;
			}

			setValues((current) => {
				const next = {...current[mode]};

				for (const token of set.tokens) {
					next[token.cssVar] =
						mode === 'dark' ? (token.dark ?? token.value) : token.value;

					// Clear the inline property too, so the value falls back to Clay's own
					// default rather than lingering as an override.
					document.documentElement.style.removeProperty(token.cssVar);
				}

				return {...current, [mode]: next};
			});
		},
		[mode]
	);

	const resetAll = useCallback(() => {
		for (const cssVar of Object.keys(defaults.light)) {
			document.documentElement.style.removeProperty(cssVar);
		}

		setValues(defaults);
	}, [defaults]);

	const store = useMemo(
		() => ({
			allEdits,
			allValues: values,
			edits: allEdits[mode],
			mode,
			resetAll,
			resetSet,
			setMode,
			setValue,
			values: values[mode],
		}),
		[allEdits, mode, resetAll, resetSet, setValue, values]
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
