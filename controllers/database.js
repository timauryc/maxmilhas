const Datastore = require('nedb')
var db = {};
//db.cpfs = new Datastore({ filename: './data/cpfs.db', autoload: true });
db.cpfs = new Datastore();

let queriesCount = 0

function getCPF(cpfNumber, callback) {
    queriesCount++
    db.cpfs.findOne({ _id: cpfNumber }, function (err, cpfObject) {
        if (err) {
            return callback(err)
        }
        return callback(null, cpfObject)
    });
}

function saveCPF(cpfObject, callback) {
    queriesCount++
    db.cpfs.insert(cpfObject, function (err, newObject) {
        if (err) {
            return callback(err)
        }
        return callback(null, newObject)
    });
}

function deleteCPF(cpfNumber, callback) {
    queriesCount++
    db.cpfs.remove({ _id: cpfNumber }, {}, function (err, numRemoved) {
        if (err) {
            return callback(err)
        }
        return callback(null, numRemoved)
    });
}

function updateCPF(cpfObject, updateObject, callback) {
    queriesCount++
    db.cpfs.update({ _id: cpfObject._id }, updateObject.update, updateObject.options, function (err, numReplaced) {
        if (err) {
            return callback(err)
        }
        return callback(null, numReplaced)
    });
}

function countCPFs(query, callback) {
    db.cpfs.count(query, function (err, count) {
        if (err) {
            return callback(err)
        }
        return callback(null, count)
    });
}

function getQueriesCount() {
    return queriesCount
}

module.exports = {
    getCPF,
    saveCPF,
    deleteCPF,
    updateCPF,
    getQueriesCount,
    countCPFs
}