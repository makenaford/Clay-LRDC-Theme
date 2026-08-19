import type {ReactNode} from 'react';

import {Icon} from '../../icons/Icon';
import type {IconName} from '../../icons/registry';
import type {ComponentSpec} from '../spec';
import {labelTokens} from './Label.tokens';

export type LabelStyle = 'tonal' | 'gradient' | 'outline';
export type LabelSize = 'large' | 'medium' | 'small';

/** Figma size -> Clay's own size tier. Medium is Clay's base `.label`, so it adds no class. */
const SIZE_CLASS: Record<LabelSize, string> = {
	large: 'label-lg',
	medium: '',
	small: 'label-sm',
};

/**
 * Figma style -> Clay display type. Tonal and outline ride on Clay's variants so their colours are
 * Clay's own properties; gradient has no Clay equivalent and carries our class instead.
 */
const STYLE_CLASS: Record<LabelStyle, string> = {
	gradient: 'lw-label--gradient',
	outline: 'label-secondary lw-label--outline',
	tonal: 'label-primary',
};

interface LabelProps {
	children: ReactNode;

	/**
	 * Renders the label as a link.
	 *
	 * This is not cosmetic. Clay gates label hover and focus behind an `[href]` selector
	 * (`[href].label-primary:hover`), so a label without one is inert no matter what the hover
	 * tokens say. The Figma component is called "Label CTA", so the interactive form is the
	 * intended one — a plain `<span>` is for when the label is decoration rather than an action.
	 */
	href?: string;

	/** Optional leading icon — the Figma's `showIcon` slot. */
	icon?: IconName;

	size?: LabelSize;
	style?: LabelStyle;
}

/**
 * Label CTA.
 *
 * Figma "Solutions Library- 2026", node 15121:237267.
 *
 * Written with Clay's label classes rather than `@clayui/label`, matching how Card, Alert and
 * Dropdown are built here — and avoiding a new direct dependency, since the markup is the whole of
 * what that package contributes. `.label-item-before` / `.label-item-expand` are Clay's own
 * structure for an icon beside a label, so the icon gap comes from `--label-item-spacer-x` rather
 * than a flex gap of ours.
 */
export function Label({
	children,
	href,
	icon,
	size = 'large',
	style = 'tonal',
}: LabelProps) {
	const className = ['label', SIZE_CLASS[size], STYLE_CLASS[style]]
		.filter(Boolean)
		.join(' ');

	const content = (
		<>
			{icon ? (
				<span className="label-item label-item-before">
					<Icon name={icon} />
				</span>
			) : null}

			<span className="label-item label-item-expand">{children}</span>
		</>
	);

	if (href) {
		return (
			<a className={className} href={href}>
				{content}
			</a>
		);
	}

	return <span className={className}>{content}</span>;
}

export const labelSpec: ComponentSpec = {
	gallery: () => (
		<div className="lw-stack">
			<div className="lw-row">
				<Label href="#tonal" style="tonal">
					Label
				</Label>

				<Label href="#tonal-m" size="medium" style="tonal">
					Label
				</Label>

				<Label href="#tonal-s" size="small" style="tonal">
					Label
				</Label>
			</div>

			<div className="lw-row">
				<Label href="#grad" style="gradient">
					Label
				</Label>

				<Label href="#grad-m" size="medium" style="gradient">
					Label
				</Label>

				<Label href="#grad-s" size="small" style="gradient">
					Label
				</Label>
			</div>

			<div className="lw-row">
				<Label href="#out" style="outline">
					Label
				</Label>

				<Label href="#out-m" size="medium" style="outline">
					Label
				</Label>

				<Label href="#out-s" size="small" style="outline">
					Label
				</Label>
			</div>

			<div className="lw-row">
				<Label href="#icon" icon="lrdc-arrow-right" style="tonal">
					With icon
				</Label>

				<Label href="#icon-g" icon="lrdc-ai" style="gradient">
					AI powered
				</Label>

				<Label href="#icon-o" icon="lrdc-security" size="small" style="outline">
					Secure
				</Label>
			</div>
		</div>
	),

	tokens: labelTokens,

	// Every variant is rendered as a link, because that is the only form in which Clay paints the
	// hover and focus states these rows are demonstrating.
	variants: [
		{
			id: 'tonal',
			label: 'Tonal',
			render: () => (
				<Label href="#tonal" style="tonal">
					Label
				</Label>
			),
		},
		{
			id: 'gradient',
			label: 'Gradient',
			render: () => (
				<Label href="#gradient" style="gradient">
					Label
				</Label>
			),
		},
		{
			id: 'outline',
			label: 'Outline',
			render: () => (
				<Label href="#outline" style="outline">
					Label
				</Label>
			),
		},
	],
};
