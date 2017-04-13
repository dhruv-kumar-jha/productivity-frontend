'use strict';

import React, { Component } from 'react';

import { Icon, Input, Button, DatePicker, Tag, message } from 'antd';
import Duedate from './meta/Duedate';
import LinkComponent from './meta/Link';
import ImageComponent from './meta/Image';
import BackgroundColorComponent from './meta/BackgroundColor';


class ModalMeta extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}



	render() {

		return (
			<div className="component__key_val_wrapper">
	
				<Duedate
					data={ this.props.data }
					mutate={ this.props.mutate }
					public={ this.props.public || false }
				/>

				<LinkComponent
					data={ this.props.data }
					mutate={ this.props.mutate }
					public={ this.props.public || false }
				/>

				<ImageComponent
					data={ this.props.data }
					mutate={ this.props.mutate }
					public={ this.props.public || false }
				/>

				<BackgroundColorComponent
					data={ this.props.data }
					mutate={ this.props.mutate }
					public={ this.props.public || false }
				/>


			</div>
		);

	}

}

export default ModalMeta;
