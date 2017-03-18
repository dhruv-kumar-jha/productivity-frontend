'use strict';

import React from 'react';
import { Col } from 'antd';

const CommonLayout = (props) => {

	return (
		<Col xs={24} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
			{ props.children }
		</Col>
	);

}

export default CommonLayout;

