'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Icon } from 'antd';

const AuthHeader = (props) => {

	return (
		<header id="main">

			<div className="logo">
				<div className="text"><Link to="/">Productivity <span>Application</span></Link></div>
			</div>

			<nav>
				<Link to="/auth/login" activeClassName="active">Login Now</Link>
				<span className="separator"></span>
				<Link to="/auth/signup" activeClassName="active">Create New Account</Link>
			</nav>

		</header>
	)

}

export default AuthHeader;
