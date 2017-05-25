'use strict';

import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'antd';

import Auth from 'app/global/api/Auth';


class MobileNav extends React.Component {

	constructor(props) {
		super();
		this.state = {
			status: false,
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.closeMobileNav = this.closeMobileNav.bind(this);
	}

	toggleNav() {
		this.setState({
			status: ! this.state.status,
		});
	}

	closeMobileNav() {
		this.setState({
			status: false,
		});
	}



	render () {

		const loggedIn = Auth.loggedIn();



		return (
			<div className="component--mobile-nav">

				<div className={`responsive-navbar-toggle hidden-sm-up ${ this.state.status ? 'active' : '' }`} onClick={ this.toggleNav }>
					{ this.state.status ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" /> }
				</div>

				<div className={`${ ! this.state.status ? 'hidden' : '' }`}>
					<div className="nav-wrapper">
						<h4>Navigation Links</h4>

						{ loggedIn &&
						<nav>
							<Link to="/dashboard" activeClassName="active" onClick={ this.closeMobileNav }><FormattedMessage id="app.nav.dashboard" defaultMessage="Dashboard" /></Link>
							<Link to="/boards" activeClassName="active" onClick={ this.closeMobileNav }>All Boards</Link>
							<Link to="/settings/general" activeClassName="active" onClick={ this.closeMobileNav }><FormattedMessage id="app.nav.settings" defaultMessage="Settings" /></Link>
							<Link to="/auth/logout" activeClassName="active" onClick={ this.closeMobileNav }><FormattedMessage id="app.nav.logout" defaultMessage="Logout" /></Link>
						</nav>
						}

						{ ! loggedIn &&
						<nav>
							<Link to="/auth/login" activeClassName="active" onClick={ this.closeMobileNav }><FormattedMessage id="app.nav.login" defaultMessage="Login Now" /></Link>
							<Link to="/auth/signup" activeClassName="active" onClick={ this.closeMobileNav }><FormattedMessage id="app.nav.create_account" defaultMessage="Create New Account" /></Link>
						</nav>
						}

						<div className="footer">
							<div className="button button-yellow" onClick={ this.closeMobileNav }>Close this Menu</div>
						</div>
					</div>
				</div>

			</div>
		)
	}

}

export default MobileNav;