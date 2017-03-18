'use strict';

import React, { Component } from 'react';
import { Checkbox, Input, Button } from 'antd';

class TodoList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			add: false,
		};
		this.showAddItemForm = this.showAddItemForm.bind(this);
		this.hideAddItemForm = this.hideAddItemForm.bind(this);
	}


	showAddItemForm() {
		this.setState({ add: true });
	}

	hideAddItemForm() {
		this.setState({ add: false });
	}


	render() {

		const todos = [
			{ id: 23, title: 'Lets do some gaming videos', description: 'Well, this is little difficult to implement.. i hoped it would be easier.', status: false },
			{ id: 435, title: 'Email marketing for dummies ebook', status: true },
			{ id: 23411, title: 'Prentend this to be a working version of todos', status: true },
			{ id: 432, title: 'Find epic ideas for features to add to this todo list.', status: false },
		];
		// const todos = [];


		const Todo = (props) => {
			const { data } = props;
			return(
				<div className="item">
					<div className="status">
						<Checkbox defaultChecked={ data.status } />
					</div>
					<div className="info">
						<div className="title">{ data.title }</div>
						{ data.description &&
							<div className="description">{ data.description }</div>
						}
					</div>
				</div>
			);
		}



		const addTodoForm = () => {
			return(
				<div className="component__todo_list add_new">
					<div>
						<Input placeholder="Todo Title" autoFocus={true} defaultValue="Welcome to Hollywood" />
						<Input
							type="textarea"
							placeholder="Please enter todo description here"
							autosize={{ minRows: 3, maxRows: 5 }}
							className="m-t-5"
							defaultValue="this is really good, you can add todo items and descriptions easily."
						/>
					</div>
					<div className="m-t-10">
						<Button type="primary">Add Todo</Button>
						<Button type="ghost" className="m-l-5" onClick={ this.hideAddItemForm }>Cancel</Button>
					</div>
				</div>
			);
		}



		return (
			<div>

				{/*
					<div className="heading">Todo List</div>
				*/}

				{ todos && todos.length > 0 &&
					<div className="component__todo_list">
						{ todos.map( todo => <Todo key={todo.id} data={todo} /> ) }

						<div className="m-t-20">
						{ this.state.add ?
							(
								addTodoForm()
							) : (
								<Button ghost type="primary" icon="plus" onClick={ this.showAddItemForm }>Add new Item</Button>
							)
						}
						</div>

					</div>
				}

				{ todos && todos.length < 1 &&
					<div className="component__todo_list empty">
						<p>You haven't added to items to this todo list yet.</p>
					</div>
				}



			</div>
		);

	}

}

export default TodoList;
