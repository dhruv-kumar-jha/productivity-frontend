'use strict';

import React from 'react';
import { Col } from 'antd';

const ProductivityLayout = (props) => {

	return (
		<Col xs={24}>
			{ props.children }
		</Col>
	);

}

export default ProductivityLayout;

