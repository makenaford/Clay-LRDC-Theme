import {useState} from 'react';

import {HomePage} from '../pages/HomePage';
import {
	componentSpecs,
	findComponentSpec,
	findTokenSet,
	patternTokenSets,
} from '../tokens/registry';
import {useTokenStore} from '../theme/tokenStore';
import {ExportPanel} from './ExportPanel';
import {StateMatrix} from './StateMatrix';
import {TokenEditor} from './TokenEditor';

type View =
	| {kind: 'component'; id: string}
	| {kind: 'pattern'; id: string}
	| {kind: 'global'}
	| {kind: 'page'}
	| {kind: 'export'};

/** Sidebar entry. */
function NavButton({
	active,
	label,
	onClick,
}: {
	active: boolean;
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			className={`lw-wb-nav__item${active ? ' is-active' : ''}`}
			onClick={onClick}
			type="button"
		>
			{label}
		</button>
	);
}

/** How many tokens in a set have been edited — shown as a dot in the sidebar. */
function useDirtyCount(setId: string): number {
	const {edits} = useTokenStore();

	const set = findTokenSet(setId);

	if (!set) {
		return 0;
	}

	return set.tokens.filter((token) => token.cssVar in edits).length;
}

function NavRow({
	active,
	label,
	onClick,
	setId,
}: {
	active: boolean;
	label: string;
	onClick: () => void;
	setId: string;
}) {
	const dirty = useDirtyCount(setId);

	return (
		<div className="lw-wb-nav__row">
			<NavButton active={active} label={label} onClick={onClick} />

			{dirty > 0 ? (
				<span
					className="lw-wb-nav__dot"
					title={`${dirty} token${dirty === 1 ? '' : 's'} edited`}
				>
					{dirty}
				</span>
			) : null}
		</div>
	);
}

export function Workbench() {
	const [view, setView] = useState<View>({kind: 'page'});

	const componentSpec =
		view.kind === 'component' ? findComponentSpec(view.id) : undefined;

	const patternSet = view.kind === 'pattern' ? findTokenSet(view.id) : undefined;

	const globalSet = findTokenSet('global');

	return (
		<div className="lw-wb">
			<nav className="lw-wb-nav">
				<div className="lw-wb-nav__brand">
					<strong>Clay Workbench</strong>

					<span>liferay.com</span>
				</div>

				<div className="lw-wb-nav__section">
					<NavButton
						active={view.kind === 'page'}
						label="Home page"
						onClick={() => setView({kind: 'page'})}
					/>

					<NavRow
						active={view.kind === 'global'}
						label="Global tokens"
						onClick={() => setView({kind: 'global'})}
						setId="global"
					/>

					<NavButton
						active={view.kind === 'export'}
						label="Export"
						onClick={() => setView({kind: 'export'})}
					/>
				</div>

				<div className="lw-wb-nav__section">
					<h2 className="lw-wb-nav__title">Components</h2>

					{componentSpecs.map((spec) => (
						<NavRow
							active={
								view.kind === 'component' &&
								view.id === spec.tokens.id
							}
							key={spec.tokens.id}
							label={spec.tokens.label}
							onClick={() =>
								setView({id: spec.tokens.id, kind: 'component'})
							}
							setId={spec.tokens.id}
						/>
					))}
				</div>

				<div className="lw-wb-nav__section">
					<h2 className="lw-wb-nav__title">Patterns</h2>

					{patternTokenSets.map((set) => (
						<NavRow
							active={view.kind === 'pattern' && view.id === set.id}
							key={set.id}
							label={set.label}
							onClick={() => setView({id: set.id, kind: 'pattern'})}
							setId={set.id}
						/>
					))}
				</div>
			</nav>

			<main className="lw-wb-main">
				{view.kind === 'page' ? (
					<div className="lw-wb-page">
						<HomePage />
					</div>
				) : null}

				{view.kind === 'export' ? (
					<div className="lw-wb-panel">
						<ExportPanel />
					</div>
				) : null}

				{view.kind === 'global' && globalSet ? (
					<div className="lw-wb-split">
						<section className="lw-wb-preview">
							<h1 className="lw-wb-panel__title">Global tokens</h1>

							<p className="lw-wb-panel__desc">
								These feed every component. The page below re-renders
								against them, so you can judge a brand change in
								context rather than on a swatch.
							</p>

							<div className="lw-wb-preview__page">
								<HomePage />
							</div>
						</section>

						<TokenEditor set={globalSet} />
					</div>
				) : null}

				{view.kind === 'component' && componentSpec ? (
					<div className="lw-wb-split">
						<section className="lw-wb-preview">
							<h1 className="lw-wb-panel__title">
								{componentSpec.tokens.label}
							</h1>

							<p className="lw-wb-panel__desc">
								{componentSpec.tokens.description}
							</p>

							<div className="lw-wb-preview__stage">
								{componentSpec.gallery()}
							</div>

							<h2 className="lw-wb-preview__subtitle">
								Interaction states
							</h2>

							<StateMatrix spec={componentSpec} />
						</section>

						<TokenEditor set={componentSpec.tokens} />
					</div>
				) : null}

				{view.kind === 'pattern' && patternSet ? (
					<div className="lw-wb-split">
						<section className="lw-wb-preview">
							<h1 className="lw-wb-panel__title">{patternSet.label}</h1>

							<p className="lw-wb-panel__desc">
								{patternSet.description}
							</p>

							<div className="lw-wb-preview__page">
								<HomePage />
							</div>
						</section>

						<TokenEditor set={patternSet} />
					</div>
				) : null}
			</main>
		</div>
	);
}
