'use strict';

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

import { graphql } from 'react-apollo';
import GetCurrentUserQuery from 'app/graphql/queries/auth/CurrentUser';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import localeData from '../../../public/locale/data.json';
window.i13n = { messages: localeData };
// window.i13n = {};

addLocaleData([ ...en, ...zh ]);


class I18n extends Component {

	constructor(props) {
		super(props);
		const locale = this.locale();
		const messages = localeData[locale];
		this.state = {
			locale: locale,
			messages: messages,
		};
	}

	componentDidMount() {
		const locale = this.locale();
		const messages = localeData[locale];
		this.setState({
			locale: locale,
			messages: messages,
		});
		if ( ! window.i13n || ! window.i13n.messages ) {
			window.i13n = { messages: localeData };
		}
	}

	componentWillReceiveProps(nextProps) {
		const locale = this.locale(nextProps);
		const messages = localeData[locale];
		if ( this.state.locale !== locale ) {
			this.setState({
				locale: locale,
				messages: messages,
			});
		}
	}


	locale(_props) {
		const props = _props || this.props;
		let locale = localStorage.locale || 'en';
		if ( props.fetch ) { return locale; }

		if ( props.data && ! props.data.loading ) {
			locale = props.data.current_user && props.data.current_user.language || locale;
			if ( ! localStorage.locale || localStorage.locale != locale ) {
				localStorage.setItem('locale', locale );
			}
		}
		window.i13n.locale = locale;
		return locale;
	}


	render() {

		return (
			<LocaleProvider locale={ this.state.locale == 'en' ? enUS : {} }>
			<IntlProvider locale={ this.state.locale } messages={ this.state.messages } >
				{ this.props.children }
			</IntlProvider>
			</LocaleProvider>
		)
	}

}

export default graphql(GetCurrentUserQuery)(I18n);
export { I18n };

