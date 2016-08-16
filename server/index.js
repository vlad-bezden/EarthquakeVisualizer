'use strict';

const http = require('http');
const requestHandlerLib = require('./modules/requestHandlerLib')
const PORT = 8180;

http.createServer(requestHandlerLib.requestHandler)
    .listen(PORT);

console.log(`Started Node.js http server at http://127.0.0.1:${PORT}`);