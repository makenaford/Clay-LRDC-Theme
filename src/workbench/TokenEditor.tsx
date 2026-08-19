import {useTokenStore} from '../theme/tokenStore';
import type {Token, TokenSet} from '../tokens/types';

/** True when the value is a plain hex colour, i.e. something a colour picker can represent. */
function isPickable(value: string): boolean {
	return /^#[0-9a-f]{3,8}$/i.test(value);
}

function TokenRow({token}: {token: Token}) {
	const {setValue, values} = useTokenStore();

	const value = values[token.cssVar] ?? token.value;

	const dirty = value !== token.value;

	return (
		<div className={`lw-wb-token${dirty ? ' lw-wb-token--dirty' : ''}`}>
			<div className="lw-wb-token__head">
				<label className="lw-wb-token__label" htmlFor={token.cssVar}>
					{token.label}

					{token.state && token.state !== 'default' ? (
						<span className="lw-wb-token__state">{token.state}</span>
					) : null}
				</label>

				{dirty ? (
					<button
						className="lw-wb-token__revert"
						onClick={() => setValue(token.cssVar, token.value)}
						title="Revert this token"
						type="button"
					>
						revert
					</button>
				) : null}
			</div>

			<div className="lw-wb-token__controls">
				{token.type === 'color' && isPickable(value) ? (
					<input
						aria-label={`${token.label} colour`}
						className="lw-wb-token__swatch"
						onChange={(event) =>
							setValue(token.cssVar, event.target.value)
						}
						type="color"
						value={value}
					/>
				) : null}

				<input
					className="lw-wb-token__text"
					id={token.cssVar}
					onChange={(event) => setValue(token.cssVar, event.target.value)}
					spellCheck={false}
					type="text"
					value={value}
				/>
			</div>

			<code className="lw-wb-token__var">{token.cssVar}</code>

			{token.description ? (
				<p className="lw-wb-token__desc">{token.description}</p>
			) : null}
		</div>
	);
}

/**
 * The editing panel for one token set.
 *
 * Tokens are grouped by interaction state so that a state family reads as a family — all the hover
 * values together, rather than scattered between the default and active ones.
 */
export function TokenEditor({set}: {set: TokenSet}) {
	const {resetSet} = useTokenStore();

	const groups = [
		{label: 'Resting', tokens: set.tokens.filter((t) => t.state === 'default')},
		{label: 'Hover', tokens: set.tokens.filter((t) => t.state === 'hover')},
		{label: 'Focus', tokens: set.tokens.filter((t) => t.state === 'focus')},
		{label: 'Active', tokens: set.tokens.filter((t) => t.state === 'active')},
		{label: 'Disabled', tokens: set.tokens.filter((t) => t.state === 'disabled')},
		{
			label: 'Other',
			tokens: set.tokens.filter((t) => !t.state),
		},
	].filter((group) => group.tokens.length > 0);

	return (
		<aside className="lw-wb-editor">
			<div className="lw-wb-editor__head">
				<h2 className="lw-wb-editor__title">{set.label} tokens</h2>

				<button
					className="lw-wb-editor__reset"
					onClick={() => resetSet(set.id)}
					type="button"
				>
					Reset set
				</button>
			</div>

			<p className="lw-wb-editor__desc">{set.description}</p>

			{groups.map((group) => (
				<section className="lw-wb-editor__group" key={group.label}>
					<h3 className="lw-wb-editor__group-title">{group.label}</h3>

					{group.tokens.map((token) => (
						<TokenRow key={token.cssVar} token={token} />
					))}
				</section>
			))}
		</aside>
	);
}
