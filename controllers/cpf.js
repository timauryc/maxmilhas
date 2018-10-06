const databaseController = require("./database")

const badRequestError = { error: "Bad request, please verify that the cpf has the correct format (ddd.ddd.ddd-dd) and the status is either FREE or BLOCK" }

function getCPFStatus(cpfNumber, callback) {
    if (isValidCPF(cpfNumber)) {
        databaseController.getCPF(cpfNumber, (err, cpf) => {
            if (err) {
                return callback(createResponseObject(500, err))
            }
            return callback(createResponseObject(200, cpf))
        })
    } else {
        return callback(createResponseObject(400, badRequestError))
    }
}

function saveCPF(cpfObject, callback) {
    if (isValidCPF(cpfObject._id) && isValidStatus(cpfObject.status)) {
        databaseController.saveCPF(cpfObject, (err, result) => {
            if (err) {
                return callback(createResponseObject(500, err))
            }
            return callback(createResponseObject(201, result))
        })
    } else {
        return callback(createResponseObject(400, badRequestError))
    }
}


function deleteCPF(cpfNumber, callback) {
    if (isValidCPF(cpfNumber)) {
        databaseController.deleteCPF(cpfNumber, (err, result) => {
            if (err) {
                return callback(createResponseObject(500, err))
            }
            return callback(createResponseObject(200, { totalDeleted: result }))
        })
    } else {
        return callback(createResponseObject(400, badRequestError))
    }
}

function updateCPFStatus(cpfObject, callback) {
    if (isValidCPF(cpfObject._id) && isValidStatus(cpfObject.status)) {
        let updateObject = {
            update: { $set: { status: cpfObject.status } }, options: {}
        }
        databaseController.updateCPF(cpfObject, updateObject, (err, result) => {
            if (err) {
                return callback(createResponseObject(500, err))
            }
            return callback(createResponseObject(200, { totalReplaced: result }))
        })
    } else {
        return callback(createResponseObject(400, badRequestError))
    }
}

function getBlacklistedCPFCount(callback) {
    databaseController.countCPFs({ status: "BLOCK" }, (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    })
}

function isValidCPF(cpfNumber) {
    return cpfNumber.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)
}

function isValidStatus(status) {
    return status == "FREE" || status == "BLOCK"
}

function createResponseObject(status, body) {
    return {
        status: status,
        body: body
    }
}

module.exports = {
    getCPFStatus,
    saveCPF,
    deleteCPF,
    updateCPFStatus,
    getBlacklistedCPFCount
}
