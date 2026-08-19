import {alertSpec} from '../components/Alert/Alert';
import {badgeSpec} from '../components/Badge/Badge';
import {buttonSpec} from '../components/Button/Button';
import {cardSpec} from '../components/Card/Card';
import {dropDownSpec} from '../components/DropDown/DropDown';
import {labelSpec} from '../components/Label/Label';
import {linkSpec} from '../components/Link/Link';
import {navTabsSpec} from '../components/NavTabs/NavTabs';
import {textInputSpec} from '../components/TextInput/TextInput';
import type {ComponentSpec} from '../components/spec';
import {capabilityGridTokens} from '../patterns/CapabilityGrid/CapabilityGrid.tokens';
import {caseStudyTokens} from '../patterns/CaseStudy/CaseStudy.tokens';
import {heroTokens} from '../patterns/Hero/Hero.tokens';
import {logoBarTokens} from '../patterns/LogoBar/LogoBar.tokens';
import {resourceGridTokens} from '../patterns/ResourceGrid/ResourceGrid.tokens';
import {siteFooterTokens} from '../patterns/SiteFooter/SiteFooter.tokens';
import {siteHeaderTokens} from '../patterns/SiteHeader/SiteHeader.tokens';
import {solutionsTabsTokens} from '../patterns/SolutionsTabs/SolutionsTabs.tokens';
import {globalTokens} from './global.tokens';
import type {TokenSet} from './types';

/**
 * The index the workbench navigates.
 *
 * Adding a component means adding its spec here and nowhere else — the sidebar, the token editor,
 * the state matrix and the export all read from this one list.
 */

export const componentSpecs: ComponentSpec[] = [
	buttonSpec,
	cardSpec,
	badgeSpec,
	labelSpec,
	alertSpec,
	textInputSpec,
	dropDownSpec,
	navTabsSpec,
	linkSpec,
];

/** Pattern token sets, in the order the sections appear on the page. */
export const patternTokenSets: TokenSet[] = [
	siteHeaderTokens,
	heroTokens,
	logoBarTokens,
	capabilityGridTokens,
	solutionsTabsTokens,
	caseStudyTokens,
	resourceGridTokens,
	siteFooterTokens,
];

export const allTokenSets: TokenSet[] = [
	globalTokens,
	...componentSpecs.map((spec) => spec.tokens),
	...patternTokenSets,
];

export function findTokenSet(id: string): TokenSet | undefined {
	return allTokenSets.find((set) => set.id === id);
}

export function findComponentSpec(id: string): ComponentSpec | undefined {
	return componentSpecs.find((spec) => spec.tokens.id === id);
}
