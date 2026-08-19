import ClayButton from '@clayui/button';

/**
 * Site header — liferay.com's masthead.
 *
 * The two CTAs are real Clay buttons, so editing the Button tokens restyles this pattern too. That
 * is the whole point of keeping patterns composed from components rather than re-styled copies.
 */
export function SiteHeader() {
	return (
		<header className="lw-header">
			<div className="lw-header__utility">
				<div className="lw-container lw-header__utility-inner">
					<span>English</span>

					<span>Partner Portal</span>

					<span>Sign In</span>
				</div>
			</div>

			<div className="lw-container lw-header__bar">
				<a className="lw-header__logo" href="#home">
					Liferay
				</a>

				<nav aria-label="Primary" className="lw-header__nav">
					<a className="lw-header__link" href="#platform">
						Platform
					</a>

					<a className="lw-header__link" href="#products">
						Products
					</a>

					<a className="lw-header__link" href="#solutions">
						Solutions
					</a>

					<a className="lw-header__link" href="#resources">
						Resources
					</a>

					<a className="lw-header__link" href="#company">
						Company
					</a>
				</nav>

				<div className="lw-header__actions">
					<ClayButton displayType="secondary" size="sm">
						Contact Sales
					</ClayButton>

					<ClayButton displayType="primary" size="sm">
						Book a Demo
					</ClayButton>
				</div>
			</div>
		</header>
	);
}
