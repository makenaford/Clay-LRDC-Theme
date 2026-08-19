import {useState} from 'react';

import {toCss, toJson} from '../theme/exportTheme';
import {useTokenStore} from '../theme/tokenStore';

/**
 * Shows the current edits as something you can paste elsewhere.
 *
 * Only *changed* tokens are emitted. Dumping all ~200 defaults would produce a file that looks
 * authoritative but silently freezes every value against future Clay updates; a diff keeps the
 * override surface honest and small.
 */
export function ExportPanel() {
	const {edits, resetAll} = useTokenStore();

	const [format, setFormat] = useState<'css' | 'json'>('css');

	const output = format === 'css' ? toCss(edits) : toJson(edits);

	const count = Object.keys(edits).length;

	return (
		<div className="lw-wb-export">
			<div className="lw-wb-export__head">
				<h2 className="lw-wb-panel__title">Export</h2>

				<div className="lw-wb-export__actions">
					<div className="lw-wb-export__tabs">
						<button
							className={`lw-wb-export__tab${format === 'css' ? ' is-active' : ''}`}
							onClick={() => setFormat('css')}
							type="button"
						>
							CSS
						</button>

						<button
							className={`lw-wb-export__tab${format === 'json' ? ' is-active' : ''}`}
							onClick={() => setFormat('json')}
							type="button"
						>
							JSON
						</button>
					</div>

					<button
						className="lw-wb-export__copy"
						onClick={() => navigator.clipboard?.writeText(output)}
						type="button"
					>
						Copy
					</button>

					<button
						className="lw-wb-export__reset"
						onClick={resetAll}
						type="button"
					>
						Reset all
					</button>
				</div>
			</div>

			<p className="lw-wb-panel__desc">
				{count === 0
					? 'No edits yet. Change a token and it appears here.'
					: `${count} token${count === 1 ? '' : 's'} changed from the shipped defaults.`}{' '}
				Component tokens in this output are Clay's own property names, so the CSS block
				works unchanged in a Liferay theme or Style Book. Pattern tokens
				(<code>--lw-*</code>) are defined by this repo and only apply here.
			</p>

			<pre className="lw-wb-export__code">{output}</pre>
		</div>
	);
}
