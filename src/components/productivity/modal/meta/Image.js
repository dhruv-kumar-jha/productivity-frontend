'use strict';

import React, { Component } from 'react';
import { Input, Button, message } from 'antd';


class ModalMetaImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			image: null,
		}

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
		this.enter = this.enter.bind(this);
	}



	open() {
		this.setState({ edit: true });
	}
	close() {
		this.setState({ edit: false, image: null });
	}


	change(event) {
		this.setState({ image: event.target.value });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}


	update() {
		if ( this.state.image === null || this.state.image == this.props.data.meta.image ) {
			return message.error('Please enter/update the image url first');
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					image: this.state.image
				}
			}
		})
		.then( res => {
			this.setState({ edit: false, image: null });
		});

	}




	render() {

		return (
			<div className="component__key_val">
				<div className="key">Image:</div>
				<div className="val">
					{ ! this.state.edit && this.props.data.meta.image &&
						<div className="full-width flex flex--sb">
							<a href={this.props.data.meta.image} target="_blank" rel="nofollow">{ this.props.data.meta.image }</a>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ this.props.data.meta.image ? 'Update Image URL' : 'Add Image URL' }</Button>
						</div>
					}

					{ ! this.state.edit && ! this.props.data.meta.image &&
						<Button type="primary" ghost size="small" onClick={ this.open }>Add Image URL</Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<Input
								placeholder="Image URL"
								defaultValue={ this.props.data.meta.image }
								onChange={ this.change }
								onKeyPress={ this.enter }
								autoFocus={ true }
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ this.props.data.meta.image ? 'Update' : 'Add' }</Button>
							<Button
								type="ghost"
								size="small"
								onClick={ this.close }
								className="m-l-5">Cancel</Button>

						</div>
					}
				</div>
			</div>
		);

	}

}

export default ModalMetaImage;

