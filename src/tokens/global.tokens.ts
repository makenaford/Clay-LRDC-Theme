import {palette} from './palette';
import {color, type Token, type TokenSet} from './types';

/**
 * Global tokens — the values every component inherits from.
 *
 * Clay derives an enormous amount from these few properties. `--primary` alone feeds button
 * backgrounds, link colours, focus rings, active nav items and form focus borders. Editing a global
 * therefore re-themes the whole system at once; editing a component token overrides just that one
 * component. That two-layer split is the point of the repo, so change globals first and only reach
 * for a component token when one component genuinely needs to diverge.
 */

const brand: Token[] = [
	color('--primary', 'Primary', palette.blue500, {
		description: 'Liferay blue. Feeds buttons, links, focus rings and active states.',
	}),
	color('--primary-d1', 'Primary · dark 1', palette.blue600, {
		description: "Clay's default hover shade for primary surfaces.",
	}),
	color('--primary-d2', 'Primary · dark 2', palette.blue800, {
		description: 'Pressed/active shade.',
	}),
	color('--primary-l1', 'Primary · light 1', palette.blue300),
	color('--primary-l2', 'Primary · light 2', palette.blue200),
	color('--primary-l3', 'Primary · light 3', palette.blue100),
	color('--secondary', 'Secondary', palette.gray500),
	color('--success', 'Success', palette.success),
	color('--info', 'Info', palette.info),
	color('--warning', 'Warning', palette.warning),
	color('--danger', 'Danger', palette.danger),
	color('--dark', 'Dark', palette.gray900),
	color('--light', 'Light', palette.gray100),
];

const neutrals: Token[] = [
	color('--white', 'White', palette.white),
	color('--gray-100', 'Gray 100', palette.gray50),
	color('--gray-200', 'Gray 200', palette.gray100),
	color('--gray-300', 'Gray 300', palette.gray200),
	color('--gray-400', 'Gray 400', palette.gray300),
	color('--gray-500', 'Gray 500', palette.gray400),
	color('--gray-600', 'Gray 600', palette.gray500),
	color('--gray-700', 'Gray 700', palette.gray600),
	color('--gray-800', 'Gray 800', palette.gray700),
	color('--gray-900', 'Gray 900', palette.gray900),
];

const surface: Token[] = [
	color('--body-background-color', 'Page background', palette.white),
	color('--body-color', 'Body text', palette.gray900),
	color('--link-color', 'Link', palette.blue500, {
		prop: 'color',
		state: 'default',
		variant: 'link',
	}),
	color('--link-hover-color', 'Link · hover', palette.blue600, {
		prop: 'color',
		state: 'hover',
		variant: 'link',
	}),
];

const shape: Token[] = [
	{
		cssVar: '--border-radius',
		label: 'Border radius',
		type: 'length',
		value: '0.25rem',
	},
	{
		cssVar: '--border-radius-lg',
		label: 'Border radius · large',
		type: 'length',
		value: '0.5rem',
	},
	{
		cssVar: '--body-font-family',
		label: 'Font family',
		type: 'text',
		value: "'Source Sans 3', 'Source Sans Pro', -apple-system, system-ui, sans-serif",
	},
	{
		cssVar: '--body-font-size',
		label: 'Base font size',
		type: 'length',
		value: '1rem',
	},
];

export const globalTokens: TokenSet = {
	description:
		'Brand ramp, neutrals and shape. Everything else inherits from here — edit these first.',
	id: 'global',
	kind: 'global',
	label: 'Global',
	tokens: [...brand, ...neutrals, ...surface, ...shape],
};
