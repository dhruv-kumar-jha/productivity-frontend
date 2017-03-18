'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Icon } from 'antd';

const Header = (props) => {

	return (
		<header id="main">

			<div className="logo">
				<div className="text"><Link to="/dashboard">Productivity <span>Application</span></Link></div>
			</div>

			<nav>
				<Link to="/dashboard" activeClassName="active">Dashboard</Link>
				<span className="separator"></span>
				<Link to="/settings" activeClassName="active">Settings</Link>
				<span className="separator"></span>
				<Link to="/auth/logout" activeClassName="active">Logout</Link>
			</nav>

		</header>
	)

}

export default Header;
