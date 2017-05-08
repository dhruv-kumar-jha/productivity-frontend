'use strict';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Heading from 'app/components/common/Heading';
import CommonLayout from 'app/components/layout/Common';
import { FormattedMessage } from 'react-intl';

import GeneralSettings from './General';
import GroupsSettings from './Groups';

import { Tabs, Col } from 'antd';


class Settings extends Component {

	constructor(props) {
		super(props);

		let tab = '';
		if ( props.location.pathname.includes("/settings/general") ) { tab = "general"; }
		if ( props.location.pathname.includes("/settings/groups") ) { tab = "groups"; }

		this.state = {
			currentTab: tab,
		};
		this.onTabChange = this.onTabChange.bind(this);
	}


	onTabChange(key) {
		browserHistory.push(`/settings/${ key }`);
	}




	render() {

		return (
			<CommonLayout>

				<Heading
					title={<FormattedMessage id="settings.title" defaultMessage="Manage your Settings" />}
					subtitle={<FormattedMessage id="settings.subtitle" defaultMessage="Manage and update your personal information, login details from here." />}
					icon="setting" />


				<Col xs={24} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }}>
				<Tabs type="card" className="m-t-30 m-b-50 component--tabs" onChange={ this.onTabChange } defaultActiveKey={ this.state.currentTab }>

					<Tabs.TabPane tab="General Settings" key="general">
						{ this.props.children }
					</Tabs.TabPane>

					<Tabs.TabPane tab="Board Groups" key="groups">
						{ this.props.children }
					</Tabs.TabPane>

				</Tabs>
				</Col>


			</CommonLayout>
		);

	}

}


export default Settings;
