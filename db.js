'use strict';

var pg = require('pg');
var Q = require('q');

var conString = 'postgres://matt@localhost/matt';
var client, deferred;

module.exports = {
    getClient: function() {
        if ( ! client ) {
            client = new pg.Client(conString);
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