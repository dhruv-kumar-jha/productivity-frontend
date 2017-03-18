'use strict';

import React, { Component } from 'react';
import { Spin } from 'antd';

class Image extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: false,
		};
		this.loaded = this.loaded.bind(this);
		this.error = this.error.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.url != this.props.url ) {
			this.setState({ loading: true, error: false });
		}
	}


	loaded() {
		this.setState({ loading: false, error: false });
	}

	error() {
		this.setState({ loading: false, error: true });
	}


	render() {

		return(
			<div className="image">
				{ this.state.loading &&
					<div className="loading">
					<Spin spinning={ this.state.loading } size="small">
						<img
							src={ this.props.url }
							alt={ this.props.title }
							onLoad={ this.loaded }
							onError={ this.error }
						/>
					</Spin>
					</div>
				}
				{ ! this.state.loading && ! this.state.error &&
					<img
						src={ this.props.url }
						alt={ this.props.title }
					/>
				}

				{ this.state.error &&
					<div className="error">
						<p>Invalid image url specified</p>
					</div>
				}

			</div>
		);

	}


}

export default Image;

