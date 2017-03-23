'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Card from 'app/components/public/boards/Card';

class PublicList extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render() {

		const { data, board } = this.props;

		return (
			<div data-list-id={ data.id } className="list">
			<div className="content" style={{ backgroundColor: data.meta.background_color || null }}>

				<header>
					<div className="title">{ data.title }</div>
				</header>


				{ data.cards &&
				<div className="cards-list">
					{ data.cards && data.cards.map( card => <Card key={ card.id } data={ card } board={ board } /> )}
				</div>
				}

			</div>
			</div>
		);
	
	}

}

export default PublicList;

