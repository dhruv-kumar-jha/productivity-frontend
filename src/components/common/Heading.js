'use strict';

import React from 'react';
import { Icon } from 'antd';

const Heading = (props) => {

	return (
		<div className={`component__heading ${props.align || '' }`}>
			<div className="icon">
				<Icon type={ props.icon || 'book' } />
			</div>
			<div>
				{ props.title &&
					<h1>{ props.title }</h1>
				}
				{ props.subtitle &&
					<p className="subtitle">{ props.subtitle }</p>
				}
				{ props.children &&
					props.children
				}
			</div>
		</div>
	)

}

export default Heading;
