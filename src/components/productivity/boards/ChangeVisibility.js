'use strict';

import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import UpdateBoardMutation from 'app/graphql/mutations/boards/Update';
import update from 'immutability-helper';

import { Icon, Modal, Button, Spin, message } from 'antd';


class ChangeVisibility extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		}
		this.toggleBoardStatus = this.toggleBoardStatus.bind(this);
	}

	toggleBoardStatus() {
		const board = this.props.data;
		const board_status = board.meta.public ? false : true;
		this.setState({ processing: true });
		this.props.mutate({
			variables: {
				id: board.id,
				meta: { public: board_status, }
			},
			optimisticResponse: {
				__typename: 'Mutation',
				updateBoard: {
					__typename: 'Board',
					meta: { public: board_status }
				},
			},
			updateQueries: {
				BoardQuery: (previousResult, { mutationResult }) => {
					const updatedBoard = mutationResult.data.updateBoard;
					const updated = update(previousResult, {
						board: {
							meta: { $set: updatedBoard.meta },
						},
					});
					return updated;
				}
			},
		})
		.then( res => {
			this.setState({ processing: false });
			message.success(`Board has been made ${ board_status ? 'public' : 'private' }.`);
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});

	}



	render() {

		const { meta } = this.props.data;

		const confirmBoardVisibilityChange = () => {
			const toggleBoardStatus = this.toggleBoardStatus;
			Modal.confirm({
				title: 'Are you sure?',
				content: meta.public ? 'Private boards can only be accessed by its owner and the users who are given access to it' : 'Publc boards can be accessed by anybody who has the board URL (or id)',
				okText: 'Yes',
				cancelText: 'No',
				onOk() {
					toggleBoardStatus();
				},
				onCancel() {},
			});
		}

		if ( meta.public ) {
			return(
				<div>
					<Button
						type="primary"
						icon="eye"
						loading={ this.state.processing }
						onClick={ confirmBoardVisibilityChange }
					>
						{ meta.public ? 'Make Private' : 'Make Public' }
					</Button>
					<a
						href={`/public/boards/${this.props.data.id}`}
						target="_blank" rel="nofollow"
						className="ant-btn ant-btn-primary ant-btn-icon-only m-l-10 m-l-10"
					><Icon type="global" /></a>
				</div>
			);
		}


		return(
			<Button
				type="primary"
				icon="eye"
				loading={ this.state.processing }
				onClick={ confirmBoardVisibilityChange }
			>
				{ meta.public ? 'Make Private' : 'Make Public' }
			</Button>
		);

	}

}


export default graphql(UpdateBoardMutation)(ChangeVisibility);
