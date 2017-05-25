'use strict';

import React, { Component } from 'react';
import translate from 'app/global/helper/translate';

import { Link, browserHistory } from 'react-router';
import CommonLayout from 'app/components/layout/Common';
import { Col, Button, Modal, Spin, message } from 'antd';
import Heading from 'app/components/common/Heading';
import Loading from 'app/components/common/Loading';

import { graphql } from 'react-apollo';
import GetAllGroupsQuery from 'app/graphql/queries/groups/All';
import DeleteGroupMutation from 'app/graphql/mutations/groups/Delete';
import update from 'immutability-helper';


class GroupsSettings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			model_create: false,
		};
		this.gotoAddNewGroup = this.gotoAddNewGroup.bind(this);
		this.confirmGroupDeletion = this.confirmGroupDeletion.bind(this);
	}


	gotoAddNewGroup() {
		browserHistory.push(`/settings/groups/create`);
	}


	handleGroupDelete(id) {
		// const loading_message = message.loading( 'Deleting group, please wait..' , 0);

		this.props.deleteGroup({
			variables: { id: id },
			optimisticResponse: {
				__typename: 'Mutation',
				deleteGroup: {
					__typename: 'Group',
					id: id,
					status: 10,
				}
			},
			updateQueries: {
				AllGroups: (previousResult, { mutationResult }) => {
					const groupIndex = _.findIndex( previousResult.groups, { id: id } );
					return update(previousResult, {
						groups: {
							$splice: [[ groupIndex, 1 ]]
						},
					});
				}
			},

		})
		.then( () => {
			// loading_message();
			message.success('Group has been successfully deleted.');
		});

	}

// deleteGroup

	confirmGroupDeletion(id) {
		const _this = this;
		Modal.confirm({
			title: "Are you sure?",
			content: "This is a non-reversible process, Once deleted you cannot recover this group again.",
			okText: translate('confirm.yes'),
			cancelText: translate('confirm.no'),

			onOk() {
				_this.handleGroupDelete(id);
			},
			onCancel() {},
		});
	}


	render() {


		if ( this.props.data.loading ) {
			return <Loading text="Loading groups, please wait..." />;
		}

		const groups = this.props.data.groups;


		return (
			<Col xs={24} sm={{ span: 22, offset: 0 }} md={{ span: 20, offset: 0 }} lg={{ span: 16, offset: 0 }}>

				<Heading
					title="Board Groups"
					subtitle="This allows you to associate boards with different groups."
					icon="folder" />


				{ groups.length > 0 &&
				<div className="settings-groups-container m-t-30 m-l-50">

					<div className="component__info__header">
						Given below is list of all the groups you have added
					</div>

					<div className="component__groups m-t-20">
						{ groups.map( group => {
							return (
								<div className="item" key={ group.id }>
								<Spin spinning={ group.id === 'loading' || group.status === 10 } size="large">
									<div className="name">{ group.name }</div>
									{ group.description &&
									<div className="description">{ group.description }</div>
									}
									<div className="actions">
										<Link to={`/settings/groups/${ group.id }/edit`}>Edit</Link>
										<Link onClick={ () => { this.confirmGroupDeletion(group.id) } }>Delete</Link>
									</div>
								</Spin>
								</div>
							)
						} ) }
					</div>

					<div className="m-t-30">
						<Button type="primary" onClick={ this.gotoAddNewGroup } className="mobile--block">Add New Group</Button>
					</div>

				</div>
				}


				{ groups.length < 1 &&
					<div className="component__groups empty m-t-30 m-l-50">
						<p>No groups has been added yet.</p>
						<p>As soon as you add a group it will appear here.</p>
						<div className="m-t-20">
							<Button type="primary" onClick={ this.gotoAddNewGroup }  className="mobile--block">Add New Group</Button>
						</div>
					</div>
				}

				{ this.props.children }


			</Col>
		)
	}



}



export default graphql(GetAllGroupsQuery)(
	graphql(DeleteGroupMutation, { name: 'deleteGroup' })(GroupsSettings)
);

