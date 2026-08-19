import {CapabilityGrid} from '../patterns/CapabilityGrid/CapabilityGrid';
import {CaseStudy} from '../patterns/CaseStudy/CaseStudy';
import {Hero} from '../patterns/Hero/Hero';
import {LogoBar} from '../patterns/LogoBar/LogoBar';
import {ResourceGrid} from '../patterns/ResourceGrid/ResourceGrid';
import {SiteFooter} from '../patterns/SiteFooter/SiteFooter';
import {SiteHeader} from '../patterns/SiteHeader/SiteHeader';
import {SolutionsTabs} from '../patterns/SolutionsTabs/SolutionsTabs';

/**
 * The whole homepage, in liferay.com's section order.
 *
 * This page adds no styling of its own. It exists so that a token edit can be judged in context —
 * a hover colour that reads well on an isolated button often does not survive being placed on a
 * dark hero next to a ghost button.
 */
export function HomePage() {
	return (
		<div className="lw-page">
			<SiteHeader />

			<main>
				<Hero />

				<LogoBar />

				<CapabilityGrid />

				<SolutionsTabs />

				<CaseStudy />

				<ResourceGrid />
			</main>

			<SiteFooter />
		</div>
	);
}
