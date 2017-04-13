'use strict';

const fs = require('fs');
const globSync = require('glob').sync;
const mkdirpSync = require('mkdirp').sync;

const localeDir = '../../../public/locale/';

const ENGLISH = require(localeDir + 'en.json' );
const CHINESE = require(localeDir + 'zh.json' );


const data = `{ "en": ${JSON.stringify(ENGLISH, null, 2)}, "zh": ${JSON.stringify(CHINESE, null, 2)} }`;
fs.writeFileSync('./public/locale/data.json', data);





// create dir if doesn't exist.
// mkdirpSync(outputDir);


// // combine all the different locales together.
// fs.writeFileSync( outputDir + 'DHRUV.json', `{ "en": ${JSON.stringify(ENGLISH, null, 2)}, "zh": ${JSON.stringify(CHINESE, null, 2)} }`);


