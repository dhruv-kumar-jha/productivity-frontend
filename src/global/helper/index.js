'use strict';

import _ from 'lodash';
import moment from 'moment';


const Helper = {


	utils: {

		getSorted(records=[], positions=[]) {
			const records_present = [];
			positions.map( (id, index) => {
				let pos = _.findIndex( records, { id: id } );
				if ( pos != -1 ) {
					records_present[index] = records[pos];
				}
			});
			const records_absent = _.filter( records, (item) => {
				return ! _.includes( positions, item.id );
			});

			return [ ...records_present, ...records_absent ];
		},

		getSortedListsAndCards(records=[], positions=[]) {
			if ( records.length == 0 ) { return records; }

			const lists = Helper.utils.getSorted( records, positions );
			const updated = [];

			lists.map( list => {
				const cards = Helper.utils.getSorted( list.cards, list.positions );
				const updated_list = _.clone(list);
				updated_list.cards = cards;
				updated.push(updated_list);
			});
			return updated;
		},

		countCompletedTodos(todos) {
			const count = _.countBy( todos, { completed: true } );
			return count.true > 0 ? count.true : 0;
		},

	},





	ui: {

		detectBackgroundBrightness(color) {
			if ( ! color ) { return 'default'; }

			// http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
			const _color = color.substring(1); // remove # from the color
			const rgb = parseInt( _color, 16 ); // convert rrggbb to decimal
			const r = ( rgb >> 16 ) & 0xff; // extract red
			const g = ( rgb >> 8 ) & 0xff; // extract green
			const b = ( rgb >> 0 ) & 0xff; // extract blue

			const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

			if ( luma < 128 ) {
				return 'dark';
			} else {
				return 'light';
			}

		},

	},






	date: {

		style(_date) {
			const duedate = moment(_date);
			const difference = duedate.diff( moment(), 'hours' );
			if ( difference > 0 ) { return 'green'; }
			else if ( difference < -24 ) { return 'orange'; }
			else { return 'blue'; }
		},

		format(_date) {
			const duedate = moment(_date);
			return duedate.format("dddd, MMMM Do YYYY");
		},

		formatYMD(_date) {
			const duedate = moment(_date);
			return duedate.format("YYYY-MM-DD");
		},

	},


	user: {
		gender(value) {
			if ( value === 1 ) { return 'Male'; }
			else if ( value === 2 ) { return 'Female'; }
			else { return 'Unspecified'; }
		}
	}



};

export default Helper;
