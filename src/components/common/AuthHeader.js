'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Icon } from 'antd';
import Auth from 'app/global/api/Auth';

const AuthHeader = (props) => {

	const loggedIn = Auth.loggedIn();

	return (
		<header id="main">

			<div className="logo">
				<div className="text"><Link to="/">Productivity <span>Application</span></Link></div>
			</div>

			{ loggedIn &&
			<nav>
				<Link to="/dashboard" activeClassName="active">Dashboard</Link>
				<span className="separator"></span>
				<Link to="/settings" activeClassName="active">Settings</Link>
				<span className="separator"></span>
				<Link to="/auth/logout" activeClassName="active">Logout</Link>
			</nav>
			}

			{ ! loggedIn &&
			<nav>
				<Link to="/auth/login" activeClassName="active">Login Now</Link>
				<span className="separator"></span>
				<Link to="/auth/signup" activeClassName="active">Create New Account</Link>
			</nav>
			}

		</header>
	)

}

export default AuthHeader;
