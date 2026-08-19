import {palette} from '../../tokens/palette';
import {color, type TokenSet} from '../../tokens/types';

/**
 * Label tokens.
 *
 * Source: Figma "Solutions Library- 2026", node 15121:237267 ("Label CTA") — a 3x3 matrix of
 * Style (Tonal / Gradient / Outline) against Size (Large / Medium / Small).
 *
 * The three Figma sizes map onto Clay's three existing label tiers rather than inventing new ones:
 *
 *   Figma Large  -> `.label-lg`   --label-lg-*
 *   Figma Medium -> `.label`      --label-*      (Clay's base tier)
 *   Figma Small  -> `.label-sm`   --label-sm-*
 *
 * and the two solid styles map onto Clay display types, so their colours are Clay's own properties
 * and survive being exported into a real Liferay theme:
 *
 *   Tonal   -> `.label-primary`   --label-primary-*
 *   Outline -> `.label-secondary` --label-secondary-*
 *
 * Gradient has no Clay equivalent — `background-color` cannot express a gradient — so it is the one
 * style carrying `--lw-` tokens. That split is the repo's usual rule: Clay's names where Clay can do
 * the work, ours only where it genuinely cannot.
 *
 * Values below are the Figma **light mode** resolutions, matching this workbench. The file also
 * defines a dark mode; where the two differ the dark value is noted on the token, so wiring a dark
 * theme later does not mean going back to Figma.
 */

export const labelTokens: TokenSet = {
	description:
		'Label CTA from Figma — tonal, gradient and outline styles across three sizes. Hover and focus apply only when the label is a link.',
	id: 'label',
	kind: 'component',
	label: 'Label',
	tokens: [
		// --- Tonal (Clay `.label-primary`) -----------------------------------------------------
		color('--label-primary-background-color', 'Tonal · background', palette.blue100, {
			description: 'Figma Components/Label/lab-tonal-bg. Dark mode: #313948.',
			prop: 'background-color',
			state: 'default',
			variant: 'tonal',
		}),
		color('--label-primary-color', 'Tonal · text', '#00256c', {
			description: 'Figma Components/Label/lab-tonal-text. Dark mode: #ffffff.',
			prop: 'color',
			state: 'default',
			variant: 'tonal',
		}),
		color('--label-primary-border-color', 'Tonal · border', 'transparent', {
			prop: 'border-color',
			state: 'default',
			variant: 'tonal',
		}),

		// Hover and focus are not specified in the Figma — it documents a static set. These are
		// derived one step along the existing blue ramp so a linked label gives some feedback, and
		// are the first thing to check with design rather than to trust.
		color('--label-primary-hover-background-color', 'Tonal · background', palette.blue200, {
			prop: 'background-color',
			state: 'hover',
			variant: 'tonal',
		}),
		color('--label-primary-hover-color', 'Tonal · text', '#00256c', {
			prop: 'color',
			state: 'hover',
			variant: 'tonal',
		}),
		color('--label-primary-hover-border-color', 'Tonal · border', 'transparent', {
			prop: 'border-color',
			state: 'hover',
			variant: 'tonal',
		}),
		color('--label-primary-focus-background-color', 'Tonal · background', palette.blue200, {
			prop: 'background-color',
			state: 'focus',
			variant: 'tonal',
		}),
		color('--label-primary-focus-color', 'Tonal · text', palette.blue800, {
			prop: 'color',
			state: 'focus',
			variant: 'tonal',
		}),

		// --- Outline (Clay `.label-secondary`) --------------------------------------------------
		color('--label-secondary-background-color', 'Outline · background', 'transparent', {
			prop: 'background-color',
			state: 'default',
			variant: 'outline',
		}),
		color('--label-secondary-color', 'Outline · text', '#262c37', {
			description: 'Figma Surfaces/Text/Primary. Dark mode: #f0f1f5.',
			prop: 'color',
			state: 'default',
			variant: 'outline',
		}),
		color('--label-secondary-border-color', 'Outline · border', palette.blue500, {
			description: 'Figma Brand/Primary/Primary.',
			prop: 'border-color',
			state: 'default',
			variant: 'outline',
		}),
		color('--label-secondary-hover-background-color', 'Outline · background', palette.blue50, {
			prop: 'background-color',
			state: 'hover',
			variant: 'outline',
		}),
		color('--label-secondary-hover-color', 'Outline · text', palette.blue800, {
			prop: 'color',
			state: 'hover',
			variant: 'outline',
		}),
		color('--label-secondary-hover-border-color', 'Outline · border', palette.blue600, {
			prop: 'border-color',
			state: 'hover',
			variant: 'outline',
		}),
		color('--label-secondary-focus-background-color', 'Outline · background', palette.blue50, {
			prop: 'background-color',
			state: 'focus',
			variant: 'outline',
		}),
		color('--label-secondary-focus-color', 'Outline · text', palette.blue800, {
			prop: 'color',
			state: 'focus',
			variant: 'outline',
		}),
		color('--label-secondary-focus-border-color', 'Outline · border', palette.blue800, {
			prop: 'border-color',
			state: 'focus',
			variant: 'outline',
		}),

		// --- Gradient (no Clay equivalent) ------------------------------------------------------
		color('--lw-label-gradient-from', 'Gradient · from', '#edf3ff', {
			description: 'Figma Components/Label/lab-grad-bg-step-01. Dark mode: #70a2ff.',
			prop: 'background-color',
			state: 'default',
			variant: 'gradient',
		}),
		color('--lw-label-gradient-to', 'Gradient · to', '#ede2ff', {
			description: 'Figma Components/Label/lab-grad-bg-step-02. Dark mode: #ba8fff.',
		}),
		color('--lw-label-gradient-color', 'Gradient · text', '#1f2531', {
			description:
				'Hardcoded in the Figma rather than bound to a variable — the same value in both modes.',
			prop: 'color',
			state: 'default',
			variant: 'gradient',
		}),
		{
			cssVar: '--lw-label-gradient-angle',
			label: 'Gradient · angle',
			type: 'text',
			value: 'to right',
		},

		// --- Size: Large (Clay `.label-lg`) -----------------------------------------------------
		{
			cssVar: '--label-lg-padding-left',
			label: 'Large · padding X',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--label-lg-padding-right',
			label: 'Large · padding X',
			type: 'length',
			value: '1rem',
		},
		{
			cssVar: '--label-lg-padding-top',
			label: 'Large · padding Y',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-lg-padding-bottom',
			label: 'Large · padding Y',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-lg-border-radius',
			description: 'Figma `round` (1000px) — a full pill at any height.',
			label: 'Large · radius',
			type: 'length',
			value: '62.5rem',
		},
		{
			cssVar: '--label-lg-font-size',
			label: 'Large · font size',
			type: 'length',
			value: '1rem',
		},

		// --- Size: Medium (Clay's base tier) ----------------------------------------------------
		{
			cssVar: '--label-padding-x',
			label: 'Medium · padding X',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-padding-y',
			label: 'Medium · padding Y',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--label-border-radius',
			description: 'Figma `medium` (8px).',
			label: 'Medium · radius',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-font-size',
			label: 'Medium · font size',
			type: 'length',
			value: '1rem',
		},

		// --- Size: Small (Clay `.label-sm`) -----------------------------------------------------
		{
			cssVar: '--label-sm-padding-left',
			label: 'Small · padding X',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-sm-padding-right',
			label: 'Small · padding X',
			type: 'length',
			value: '0.5rem',
		},
		{
			cssVar: '--label-sm-padding-top',
			label: 'Small · padding Y',
			type: 'length',
			value: '0.125rem',
		},
		{
			cssVar: '--label-sm-padding-bottom',
			label: 'Small · padding Y',
			type: 'length',
			value: '0.125rem',
		},
		{
			cssVar: '--label-sm-border-radius',
			description: 'Figma `small` (4px).',
			label: 'Small · radius',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--label-sm-font-size',
			label: 'Small · font size',
			type: 'length',
			value: '0.875rem',
		},

		// --- Shared ------------------------------------------------------------------------------
		{
			cssVar: '--label-font-weight',
			description: 'Figma Paragraph/Base/Heavy — Source Sans 3 SemiBold.',
			label: 'Font weight',
			type: 'number',
			value: '600',
		},
		{
			cssVar: '--label-line-height',
			description: 'Figma 24/16 on Large and Medium. Small overrides this to 1.25.',
			label: 'Line height',
			type: 'number',
			value: '1.5',
		},
		{
			cssVar: '--label-item-spacer-x',
			description: 'Gap between the icon and the text — Figma `small` (4px).',
			label: 'Icon gap',
			type: 'length',
			value: '0.25rem',
		},
		{
			cssVar: '--label-border-width',
			description:
				'The Figma draws no stroke on tonal or gradient, but Clay gives every label a 1px border by default — which would render them 2px wider and taller than the design. Zeroed here; the outline style re-declares it on itself.',
			label: 'Border width',
			type: 'length',
			value: '0',
		},
		{
			cssVar: '--lw-label-outline-border-width',
			description:
				'The Figma draws this stroke inside the shape, so it is rendered as an inset shadow rather than a border — a CSS border would sit outside and make outline labels 4px taller than tonal ones.',
			label: 'Outline · stroke width',
			type: 'length',
			value: '2px',
		},
	],
};
