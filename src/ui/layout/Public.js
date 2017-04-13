'use strict';

import React from 'react';

import Header from 'app/components/common/AuthHeader';
import { I18n } from './I18n';

const Default = (props) => {

	return (
		<I18n>
		<div className="has-fh">

			<Header />

			<main className="body-wrapper">
				{ props.children }
			</main>

		</div>
		</I18n>
	)

}

export default Default;
