'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import { Col, Spin } from 'antd';


const Board = (props) => {

	const { data } = props;


	const handleClick = () => {
		browserHistory.push(`/boards/${ data.id }`);
	}

	const styles = {};
	if ( data.meta.background ) { styles.backgroundColor = data.meta.background };


	return (
		<Col xs={24} sm={12} md={8} lg={6} className="board-container">
		{ data.id === 'loading' || data.status === 10 ?
			(
			<Spin spinning={ true } tip={ data.id === 'loading' ? 'Adding board..' : 'Deleting board' } size="large">
			<div className="board">
				<div className="title">{ data.title }</div>
				{ data.description &&
					<div className="description">{ data.description }</div>
				}
			</div>
			</Spin>
			) : (
			<div className="board" onClick={ handleClick }>
				<div className="title">{ data.title }</div>
				{ data.description &&
					<div className="description">{ data.description }</div>
				}
			</div>
			)
		}
		</Col>
	)

}


export default Board;