import ClayIcon from '@clayui/icon';
import type {SVGAttributes} from 'react';

import type {IconName} from './registry';

interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
	/** A name from the generated registry — misspellings are a compile error, not a blank icon. */
	name: IconName;
}

/**
 * Typed wrapper around `ClayIcon`.
 *
 * The only thing this adds is the type on `name`, and that is the whole point: `ClayIcon` takes
 * `symbol: string`, so `<ClayIcon symbol="serach" />` renders an empty `<svg>` and reports nothing —
 * no console warning, no thrown error, just a gap where the icon should be. Going through the
 * generated union means the compiler catches it.
 *
 * Icons inherit `currentColor`, so colour them by setting `color` on an ancestor rather than
 * passing a fill. That is what keeps them responsive to the design tokens.
 *
 * Note that Clay renders icons with `role="presentation"` — they are invisible to screen readers by
 * design. Any icon carrying meaning on its own (an icon-only button) needs an `aria-label` on the
 * control around it.
 */
export function Icon({name, ...props}: IconProps) {
	return <ClayIcon symbol={name} {...props} />;
}
