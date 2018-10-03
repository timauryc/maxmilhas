const databaseController = require("./database")

function saveCPF(cpfObject, callback) {
    databaseController.saveCPF(cpfObject, (err, result) => {
        if (err)
            return callback(err)
        return callback(null, result)
    })
}


function getCPFStatus(cpfNumber, callback) {
    databaseController.getCPF(cpfNumber, (err, cpf) => {
        if (err)
            return callback(err)
        return callback(null, cpf)
    })
}

function deleteCPF(cpfNumber, callback) {
    databaseController.deleteCPF(cpfNumber, (err, result) => {
        if (err)
            return callback(err)
        return callback(null, result)
    })
}

function updateCPFStatus(cpfObject, callback) {
    let updateObject = {
        update: { $set: { status: cpfObject.status } }, options: {}
    }
    databaseController.updateCPF(cpfObject, updateObject, (err, result) => {
        if (err)
            return callback(err)
        return callback(null, result)
    })
}

module.exports = {
    getCPFStatus,
    saveCPF,
    deleteCPF,
    updateCPFStatus
}
