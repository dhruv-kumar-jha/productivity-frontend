'use strict';

import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
const messages = defineMessages({
	cm_link_placeholder: { id: "card.meta.link.placeholder", defaultMessage: "Link URL" },
	cm_image_placeholder: { id: "card.meta.image.placeholder", defaultMessage: "Image URL" },
	component_colorpicker_placeholder: { id: "component.colorpicker.placeholder", defaultMessage: "Color" },
	card_header_title_placeholder: { id: "card.header.title.placeholder", defaultMessage: "Card Title" },
	card_general_form_placeholder: { id: "card.general.form.placeholder", defaultMessage: "Enter your description here. (Markdown allowed)" },

	card_todo_form_placeholder_title: { id: "card.todo.form.placeholder.title", defaultMessage: "Todo Title" },
	card_todo_form_placeholder_description: { id: "card.todo.form.placeholder.description", defaultMessage: "Please enter todo description here" },
	card_todo_form_processing: { id: "card.todo.form.processing", defaultMessage: "Adding item.." },


	list_form_placeholder_title: { id: "list.form.placeholder.title", defaultMessage: "List Title" },
	list_form_placeholder_description: { id: "list.form.placeholder.description", defaultMessage: "List description" },
	list_form_placeholder_space_before: { id: "list.form.placeholder.space_before", defaultMessage: "Example: 1" },
	list_form_placeholder_space_after: { id: "list.form.placeholder.space_after", defaultMessage: "Example: 1" },
	list_form_validate_title: { id: "list.form.validate.title", defaultMessage: "Please enter List Title" },

	board_form_placeholder_title: { id: "board.form.placeholder.title", defaultMessage: "Board Title" },
	board_form_placeholder_description: { id: "board.form.placeholder.description", defaultMessage: "Board description" },
	board_form_placeholder_background_image_url: { id: "board.form.placeholder.background_image_url", defaultMessage: "Background image URL" },
	board_form_validate_title: { id: "board.form.validate.title", defaultMessage: "Please enter Board Title" },


	messages_card_new_success: { id: "messages.card.new.success", defaultMessage: "New card has been successfully added." },
	messages_card_delete_loading: { id: "messages.card.delete.loading", defaultMessage: "Deleting card, please wait.." },
	messages_card_delete_success: { id: "messages.card.delete.success", defaultMessage: "Card has been successfully deleted." },
	messages_card_update_success: { id: "messages.card.update.success", defaultMessage: "Card details have been successfully updated." },
	messages_card_show_error: { id: "messages.card.show.error", defaultMessage: "The card you're looking for doesn't exist or your dont have permissions to access it." },
	messages_card_processing_delete: { id: "messages.card.processing.delete", defaultMessage: "Deleting card..." },
	messages_card_processing_update: { id: "messages.card.processing.update", defaultMessage: "Updating card details..." },

	confirm_yes: { id: "confirm.yes", defaultMessage: "Yes" },
	confirm_no: { id: "confirm.no", defaultMessage: "No" },
	confirm_common_title: { id: "confirm.common.title", defaultMessage: "Are you sure?" },
	confirm_card_delete_description: { id: "confirm.card.delete.description", defaultMessage: "This is a non reversible process, Once deleted you cannot recover this card again." },
	confirm_list_delete_description: { id: "confirm.list.delete.description", defaultMessage: "This is a non reversible process, Once deleted you cannot recover this list again." },

	messages_card_new_empty: { id: "messages.card.new.empty", defaultMessage: "Please enter card title first." },

	messages_list_background_empty: { id: "messages.list.background.empty", defaultMessage: "You haven't set any background color yet." },
	messages_list_update_warning: { id: "messages.list.update.warning", defaultMessage: "You haven't made any changes yet." },
	messages_list_update_success: { id: "messages.list.update.success", defaultMessage: "List details has been successfully updated." },
	messages_list_show_error: { id: "messages.list.show.error", defaultMessage: "The list you're looking for doesn't exist or your dont have permissions to access it." },
	messages_card_title_update_empty: { id: "messages.card.title.update.empty", defaultMessage: "Please make changes to the title first." },
	messages_list_new_success: { id: "messages.list.new.success", defaultMessage: "New list has been successfully added." },

	messages_list_position_updated: { id: "messages.list.position.updated", defaultMessage: "Card position has been successfully updated." },
	messages_list_delete_processing: { id: "messages.list.delete.processing", defaultMessage: "Deleting list, please wait.." },
	messages_list_delete_success: { id: "messages.list.delete.success", defaultMessage: "List has been successfully deleted." },

	messages_card_update_description_warning: { id: "messages.card.update.description.warning", defaultMessage: "Please make changes to the description first" },
	"messages.card.todo.title.empty": { id: "messages.card.todo.title.empty", defaultMessage: "Please enter todo item title" },
	"messages.card.todo.processing": { id: "messages.card.todo.processing", defaultMessage: "Adding new todo item.." },
	"messages.card.todo.success": { id: "messages.card.todo.success", defaultMessage: "New todo has been successfully added." },


	"messages.card.todo.item.update.empty": { id: "messages.card.todo.item.update.empty", defaultMessage: "Please make changes to the item first." },
	messages_101: { id: "messages.card.todo.item.update.success", defaultMessage: "Todo item has been successfully updated." },
	messages_102: { id: "messages.card.todo.item.delete.loading", defaultMessage: "Deleting todo item.." },
	messages_103: { id: "messages.card.todo.item.delete.success", defaultMessage: "Todo item has been successfully deleted." },
	messages_104: { id: "messages.card.todo.item.status.update", defaultMessage: "Updating todo status.." },
	messages_105: { id: "messages.card.todo.item.status.update.success", defaultMessage: "Todo item status has been successfully updated." },

	messages_106: { id: "messages.card.duedate.error", defaultMessage: "Please make changes to the due date first" },
	messages_107: { id: "messages.card.image.error", defaultMessage: "Please enter/update the image url first" },
	messages_108: { id: "messages.card.link.error", defaultMessage: "Please enter/update the link first" },
	messages_109: { id: "messages.card.background.error", defaultMessage: "Please enter/update the background color first" },
	messages_110: { id: "confirm.todo.delete.description", defaultMessage: "This is a non reversible process, Once deleted you cannot recover this todo item again." },
	messages_111: { id: "confirm.board.delete.description", defaultMessage: "This is a non reversible process, Once deleted you cannot recover this board, its lists and cards again." },


	messages_112: { id: "messages.board.new.success", defaultMessage: "New board has been successfully added." },
	messages_113: { id: "messages.board.delete.processing", defaultMessage: "Deleting board, please wait.." },
	messages_114: { id: "messages.board.delete.success", defaultMessage: "Board has been successfully deleted." },
	messages_115: { id: "messages.board.processing.adding", defaultMessage: "Adding board.." },
	messages_116: { id: "messages.board.processing.deleting", defaultMessage: "Deleting board" },
	messages_117: { id: "confirm.board.toggle.private", defaultMessage: "Private boards can only be accessed by its owner and the users who are given access to it" },
	messages_118: { id: "confirm.board.toggle.public", defaultMessage: "Publc boards can be accessed by anybody who has the board URL (or id)" },
	messages_119: { id: "messages.board.status.public", defaultMessage: "Board has been made public." },
	messages_120: { id: "messages.board.status.private", defaultMessage: "Board has been made private." },

	messages_121: { id: "messages.board.update.warning", defaultMessage: "You haven't made any changes yet." },
	messages_122: { id: "messages.board.update.success", defaultMessage: "Board details has been successfully updated." },
	messages_123: { id: "messages.board.show.error", defaultMessage: "Board not found or you don't have permissions to access it." },
	messages_124: { id: "messages.board.show.loading", defaultMessage: "Loading board details..." },
	messages_125: { id: "messages.board.list.position.update", defaultMessage: "Updating the position of the list.." },
	messages_126: { id: "messages.board.list.position.update.success", defaultMessage: "List position has been successfully updated." },
	messages_127: { id: "messages.board.loading", defaultMessage: "Loading boards..." },
	messages_128: { id: "messages.settings.warning", defaultMessage: "You haven't made any changes yet." },
	messages_128: { id: "messages.settings.processing", defaultMessage: "Updating your details.." },
	messages_130: { id: "messages.settings.success", defaultMessage: "Your details has been successfully updated." },
	messages_131: { id: "messages.settings.loading", defaultMessage: "Loading user details..." },
	messages_132: { id: "messages.auth.success", defaultMessage: "You have successfully logged in." },
	messages_133: { id: "messages.logout.success", defaultMessage: "You have been successfully logged out." },
	messages_134: { id: "messages.signup.success", defaultMessage: "Your account has been successfully created." },
	messages_135: { id: "global.token.expired", defaultMessage: "Your token has expired/invalidated. Please login again to generate new token" },
	messages_136: { id: "global.record.empty", defaultMessage: "Record doesn't exist or you dont have permissions to access it" },




});


const translate = ( id, defaultText='' ) => {
	const locale = window.i13n.locale;
	return window.i13n.messages[locale][id] || defaultText;
}

export default translate;

