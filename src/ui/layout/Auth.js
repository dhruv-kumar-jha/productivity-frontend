'use strict';

import React from 'react';

import AuthHeader from 'app/components/common/AuthHeader';
import { I18n } from './I18n';


const Default = (props) => {

	return (
		<I18n fetch={ false }>
		<div className="has-fh">

			<AuthHeader />

			<main className="body-wrapper">
				{ props.children }
			</main>

		</div>
		</I18n>
	)

}

export default Default;
