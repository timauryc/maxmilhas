const Datastore = require('nedb')
var db = {};
db.cpfs = new Datastore({ filename: './data/cpfs.db', autoload: true });
//db.cpfs = new Datastore();


function getCPF(cpfNumber, callback) {
    db.cpfs.findOne({ _id: cpfNumber }, function (err, cpfObject) {
        if (err)
            return callback(err)
        return callback(null, cpfObject)
    });
}

function saveCPF(cpfObject, callback) {
    db.cpfs.insert(cpfObject, function (err, newObject) {
        if (err)
            return callback(err)
        return callback(null, newObject)
    });
}

function deleteCPF(cpfNumber, callback) {
    db.cpfs.remove({ _id: cpfNumber }, {}, function (err, numRemoved) {
        if (err)
            return callback(err)
        return callback(null, numRemoved)
    });
}

function updateCPF(cpfObject, updateObject, callback) {
    db.cpfs.update({ _id: cpfObject._id }, updateObject.update, updateObject.options, function (err, numReplaced) {
        if (err)
            return callback(err)
        return callback(null, numReplaced)
    });
}

module.exports = {
    getCPF,
    saveCPF,
    deleteCPF,
    updateCPF
}