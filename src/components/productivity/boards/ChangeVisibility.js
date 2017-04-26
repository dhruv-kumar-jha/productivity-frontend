'use strict';

import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import UpdateBoardMutation from 'app/graphql/mutations/boards/Update';
import update from 'immutability-helper';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';

import { Icon, Modal, Button, Spin, message } from 'antd';


class ChangeVisibility extends Component {

	constructor(props) {
		super(props);
		this.state = {
			processing: false,
		}
		this.toggleBoardStatus = this.toggleBoardStatus.bind(this);
		this.openPublicBoard = this.openPublicBoard.bind(this);
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
			if ( board_status ) {
				message.success( translate('messages.board.status.public') )
			} else {
				message.success( translate('messages.board.status.private') )
			}
			// board_status ? message.success( translate('messages.board.status.public') ) : message.success( translate('messages.board.status.private') )
			// message.success(`Board has been made ${ board_status ? 'public' : 'private' }.`);
		})
		.catch( res => {
			if ( res.graphQLErrors ) {
				const errors = res.graphQLErrors.map( error => error.message );
			}
		});

	}


	openPublicBoard() {
		window.open( `/public/boards/${this.props.data.id}`,'_blank');
	}



	render() {

		const { meta } = this.props.data;

		const confirmBoardVisibilityChange = () => {
			const toggleBoardStatus = this.toggleBoardStatus;
			Modal.confirm({
				title: translate('confirm.common.title'),
				content: meta.public ? translate('confirm.board.toggle.private') : translate('confirm.board.toggle.public'),
				okText: translate('confirm.yes'),
				cancelText: translate('confirm.no'),

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
						{ meta.public ? <FormattedMessage id="board.visibility.private" defaultMessage="Make Private" /> : <FormattedMessage id="board.visibility.public" defaultMessage="Make Public" /> }
					</Button>
					<Button
						type="primary"
						icon="global"
						className="m-l-10"
						onClick={ this.openPublicBoard }
					/>
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
				{ meta.public ? <FormattedMessage id="board.visibility.private" defaultMessage="Make Private" /> : <FormattedMessage id="board.visibility.public" defaultMessage="Make Public" /> }
			</Button>
		);

	}

}


export default graphql(UpdateBoardMutation)(ChangeVisibility);
