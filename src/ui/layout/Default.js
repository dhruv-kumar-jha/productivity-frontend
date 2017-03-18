'use strict';

import React from 'react';

import Header from 'app/components/common/Header';

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const Default = (props) => {

	return (
		<LocaleProvider locale={enUS}>
		<div className="has-fh">

			<Header />

			<main className="body-wrapper">
				{ props.children }
			</main>

		</div>
		</LocaleProvider>
	)

}

export default Default;
