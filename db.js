'use strict';

var pg = require('pg');
var Q = require('q');
var jsonfile = require('jsonfile');
var path = require('path');

var client, deferred;

function getConnectionString () {
    var json = jsonfile.readFileSync(path.resolve(__dirname, 'database.json'));
    var conf = json.dev;
    return 'postgres://'+ conf.user +':'+ conf.password +'@'+ conf.host +'/'+ conf.database;
}

module.exports = {
    getClient: function() {
        if ( ! client ) {
            client = new pg.Client(getConnectionString());
            deferred = Q.defer();

            client.connect(function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(client);
                }
            });    
        }

        return deferred.promise;
    },
};