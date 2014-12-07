var debug = require('debug')('whyilove');
var db = require('./db');

module.exports = function(socket) {
    socket.on('v', function(id) {
        db.getClient().then(function(client) {
            debug('view id ' + id);    
            client.query('UPDATE reasons SET views = views + 1 WHERE id = ' + id);
        });
    });

    socket.on('disconnect', function() {
        debug('Socket disconnected');
    });
};