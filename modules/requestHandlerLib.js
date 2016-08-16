'use strict';

const fs = require('fs');
const path = require('path');

function requestHandler(request, response) {
    console.log(`REQUEST: ${request.url}`);

    if (request.url === '/' || request.url === '/index' || request.url === '/index.html') {
        getFileContent(response, 'app/index.html', 'text/html');
    } else if (request.url === '/favicon.ico') {
        getFileContent(response, 'app/assets/favicon.ico', 'image/png');
    } else if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
        getFileContent(response, request.url.toString().substring(1), 'text/javascript');
    } else if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
        getFileContent(response, request.url.toString().substring(1), 'text/css');
    } else if (/^\/[a-zA-Z0-9\/]*.ico$/.test(request.url.toString())) {
        getFileContent(response, request.url.toString().substring(1), 'image/png');
    } else {
        console.log(`Invalid User Request: ${request.url}`);
        response.end();
    }
}

function getFileContent(response, fileName, contentType) {
    const fullFilePath = path.join(__dirname, '..', fileName); 
    
    console.log(`File Path: ${fullFilePath}`);

    fs.readFile(fullFilePath, function (err, data) {
        if (err) {
            const errorMessage = `${fileName} Not Found!`;
            console.log(errorMessage)
            response.writeHead(404, { 'Content-Type': contentType });
            response.write(errorMessage);
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
    requestHandler
}