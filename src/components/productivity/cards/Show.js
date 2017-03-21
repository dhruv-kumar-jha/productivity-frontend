'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

import { Icon, Spin, Tag } from 'antd';
import Helper from 'app/global/helper';

import ImageComponent from './utils/Image';


const Card = (props) => {

	const { data } = props;

	const showCardModal = (event) => {
		// if a link was clicked, do nothing.
		if ( event.target.parentNode.target === '_blank' ) {
			return null;
		}
		browserHistory.push(`/boards/${props.board.id}/cards/${ data.id }`);
	}





	return (
		<div className="card" data-card-id={ data.id }>
		<Spin spinning={ data.id === 'loading' } size="large">
			<div className="card--content" onClick={ showCardModal } style={{ backgroundColor: data.meta.background_color || null }}>
				{ data.meta.image &&
					<ImageComponent url={data.meta.image} title={data.title} />
				}
				<div className="title">{ data.title }</div>
				<div className="actions">
					{ data.description &&
						<div className="icon"><Icon type="bars" /></div>
					}
					{ data.meta.duedate &&
						<div><Tag color={ Helper.date.style(data.meta.duedate) } className="duedate m-r-0">{ Helper.date.formatYMD(data.meta.duedate) }</Tag></div>
					}
					{ data.todos && data.todos.length > 0 &&
						<div className="icon"><Icon type="check-square-o" /><span>{ Helper.utils.countCompletedTodos(data.todos) }/ { data.todos.length }</span></div>
					}
					{ data.meta.link &&
						<div className="icon right">
							<a href={ data.meta.link } target="_blank" rel="nofollow"><Icon type="global" /></a>
						</div>
					}
				</div>
			</div>
		</Spin>
		</div>
	);

}

export default Card;

