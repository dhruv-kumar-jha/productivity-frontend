'use strict';

import React from 'react';

import CommonLayout from 'app/components/layout/Common';
import Heading from 'app/components/common/Heading';


const PageNotFound = (props) => {

	return (
		<CommonLayout>

			<Heading
				title="Page Not Found"
				subtitle="The page you're looking for doesn't exist or you don't have permissions to access it."
				icon="exclamation-circle"
				align="center"
			/>

		</CommonLayout>
	);

}

export default PageNotFound;
