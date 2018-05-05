const fs = require('fs');

var logToServerLog = ((logMessage, callback) => {
    
    var now = new Date().toString();
    var log = `${now}: ${logMessage}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    return
});

module.exports = {logToServerLog};