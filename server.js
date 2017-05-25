'use strict';

const express = require('express');
const app = express();
const compression = require('compression')


app.set( 'port', process.env.PORT || 1300 );

app.use( (req, res, next) => {
	setTimeout(function() {
		next();
	}, 500 );
});


app.use( compression() );

// app.use( '/public', express.static('public') );
app.use( express.static('public') );

app.get('/*', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.listen( app.get('port'), function () {
	console.log('Server running at http://localhost:%s', app.get('port'));
});

