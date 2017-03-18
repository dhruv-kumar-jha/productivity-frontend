'use strict';

import React from 'react';

const Loading = (props) => {

	return (
		<div className={`component__loading ${props.type || 'default'}`}>
			<div className="loading">
				<div className="bar-container">
					<div className="bar"></div>
				</div>
				{ ! props.hideText &&
					<p className="info">{ props.text || 'Loading..., Please wait..' }</p>
				}
			</div>
		</div>
	)

}

export default Loading;

