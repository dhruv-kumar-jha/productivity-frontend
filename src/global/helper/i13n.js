'use strict';


const manageTranslations = require('react-intl-translations-manager').default;


manageTranslations({
	messagesDirectory: 'public/translations/src',
	translationsDirectory: 'public/locale',
	languages: ['en','zh'], // all the languages wa want to support.
	singleMessagesFile: true,
	jsonOptions: {
		space: 4,
		trailingNewline: true,
	},

	overrideCoreMethods: {
		provideTranslationsFile: (language) => {
			const data = require(`../i13n/${language}.json`);
			return data || {};
		},
	},

});

