var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('reasons', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        reason: {type: 'string', notNull: true, unique: true},
        views: {type: 'int', notNull: true, defaultValue: 0}
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('reasons', callback);
};
