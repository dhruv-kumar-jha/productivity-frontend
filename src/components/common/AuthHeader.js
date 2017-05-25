'use strict';

import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Icon } from 'antd';
import Auth from 'app/global/api/Auth';
import MobileNav from './MobileNav';

const AuthHeader = (props) => {

	const loggedIn = Auth.loggedIn();

	return (
		<header id="main">

			<div className="logo">
				<div className="text">
				<Link to="/dashboard">
					<FormattedMessage id="app.name.main" defaultMessage="Productivity" />
					<span className="light"> <FormattedMessage id="app.name.sub" defaultMessage="Application" /></span>
				</Link>
				</div>
			</div>

			{ loggedIn &&
			<nav className="hidden-xs-down">
				<Link to="/dashboard" activeClassName="active"><FormattedMessage id="app.nav.dashboard" defaultMessage="Dashboard" /></Link>
				<span className="separator"></span>
				<Link to="/boards" activeClassName="active">All Boards</Link>
				<span className="separator"></span>
				<Link to="/settings/general" activeClassName="active"><FormattedMessage id="app.nav.settings" defaultMessage="Settings" /></Link>
				<span className="separator"></span>
				<Link to="/auth/logout" activeClassName="active"><FormattedMessage id="app.nav.logout" defaultMessage="Logout" /></Link>
			</nav>
			}

			{ ! loggedIn &&
			<nav className="hidden-xs-down">
				<Link to="/auth/login" activeClassName="active"><FormattedMessage id="app.nav.login" defaultMessage="Login Now" /></Link>
				<span className="separator"></span>
				<Link to="/auth/signup" activeClassName="active"><FormattedMessage id="app.nav.create_account" defaultMessage="Create New Account" /></Link>
			</nav>
			}

			<MobileNav />

		</header>
	)

}

export default AuthHeader;
