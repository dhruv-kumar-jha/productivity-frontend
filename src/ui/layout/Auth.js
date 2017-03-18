'use strict';

import React from 'react';

import AuthHeader from 'app/components/common/AuthHeader';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const Default = (props) => {

	return (
		<LocaleProvider locale={enUS}>
		<div className="has-fh">

			<AuthHeader />

			<main className="body-wrapper">
				{ props.children }
			</main>

		</div>
		</LocaleProvider>
	)

}

export default Default;
