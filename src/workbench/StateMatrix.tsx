import {definedStates, stateOverlay} from '../theme/stateOverlay';
import {useTokenStore} from '../theme/tokenStore';
import type {ComponentSpec} from '../components/spec';
import type {CSSProperties} from 'react';

/**
 * Every variant against every state it defines.
 *
 * Each cell paints itself by applying that state's token values onto the resting properties (see
 * `stateOverlay`), so what you see is produced by the same tokens a real pointer interaction would
 * use. The `disabled` column is the exception — it passes a genuine `disabled` prop as well, because
 * a disabled control differs in more than colour and should look inert, not merely grey.
 */
export function StateMatrix({spec}: {spec: ComponentSpec}) {
	const {values} = useTokenStore();

	const states = definedStates(spec.tokens);

	return (
		<div className="lw-wb-matrix">
			<table className="lw-wb-matrix__table">
				<thead>
					<tr>
						<th scope="col">Variant</th>

						{states.map((state) => (
							<th key={state} scope="col">
								{state}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{spec.variants.map((variant) => (
						<tr key={variant.id}>
							<th scope="row">{variant.label}</th>

							{states.map((state) => {
								const overlay = stateOverlay(
									spec.tokens,
									state,
									values
								);

								const defines =
									state === 'default' ||
									spec.tokens.tokens.some(
										(token) =>
											token.state === state &&
											token.variant === variant.id
									);

								return (
									<td key={state}>
										{defines ? (
											<div
												style={
													overlay as CSSProperties
												}
											>
												{variant.render({
													disabled:
														state ===
														'disabled',
												})}
											</div>
										) : (
											<span
												className="lw-wb-matrix__na"
												title={`Clay defines no ${state} state for this variant`}
											>
												—
											</span>
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>

			<p className="lw-wb-matrix__note">
				Cells marked <span className="lw-wb-matrix__na">—</span> are states Clay does
				not style for that variant. They are left empty rather than filled with an
				invented value.
			</p>
		</div>
	);
}
