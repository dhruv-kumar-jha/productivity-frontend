'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import { Modal, message, Button } from 'antd';
import _ from 'lodash';

import ModalHeader from 'app/components/productivity/modal/Header';
import CardTabGeneral from 'app/components/productivity/modal/General';
import CardTabTodoList from 'app/components/productivity/modal/Todo';
import CardTabMeta from 'app/components/productivity/modal/Meta';


class PublicShowCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tab: 'default',
		};
		this.handleCancel = this.handleCancel.bind(this);
		this.setActiveTab = this.setActiveTab.bind(this);
	}



	handleCancel() {
		browserHistory.push(`/public/boards/${this.props.params.id}`);
	}

	setActiveTab(tab) {
		this.setState({ tab: tab || 'default' });
	}



	render() {

		const list = _.filter( this.props.data.publicBoard.lists, { cards: [ {id: this.props.params.card_id} ] } )[0];

		if ( ! list ) {
			setTimeout( () => {
				message.error("The card you're looking for doesn't exist or your dont have permissions to access it.");
				this.handleCancel();
			}, 50);
			return <div></div>;
		}

		const card = _.find( list.cards, { id: this.props.params.card_id } );


		return (
			<Modal
				wrapClassName="modal__primary"
				visible={ true }
				maskClosable={ false }
				onCancel={ this.handleCancel }
				footer={[]}
			>
			<div>

				<ModalHeader
					title={ card.title }
					subtitle={ <div>In list <span>{ list.title }</span></div> }
					editable={ true }
					data={ card }
					editable={ false }
				/>

				<div className="container card">

					<div className="content">
						{ this.state.tab === 'default' && <CardTabGeneral public={ true } data={ card } /> }
						{ this.state.tab === 'todo' && <CardTabTodoList public={ true } data={ card } /> }
						{ this.state.tab === 'meta' && <CardTabMeta public={ true } data={ card } /> }
					</div>

					<div className="aside">
						<div className="actions">
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('default') } }
								disabled={ this.state.tab === 'default' }
								>General</Button>
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('todo') } }
								disabled={ this.state.tab === 'todo' }
								>Todo List</Button>
							<Button
								size="small"
								type="primary"
								onClick={ () => { this.setActiveTab('meta') } }
								disabled={ this.state.tab === 'meta' }
								>Meta Details</Button>
						</div>
					</div>

				</div>


			</div>
			</Modal>
		);

	}

}

export default PublicShowCard;

