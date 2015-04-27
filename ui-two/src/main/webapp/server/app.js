'use strict';

var express = require('express');
var app = express();
var port = 8001;

app.use('/api', require('./routes'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
