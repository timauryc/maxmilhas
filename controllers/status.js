const databaseController = require('./database')
const cpfController = require('./cpf')
const os = require('os')

function getStatus(callback) {
    let statusObject = {}
    cpfController.getBlacklistedCPFCount((err, result) => {
        if (err) {
            return callback(err)
        } else {
            statusObject.uptime = process.uptime() 
            statusObject.queriesCount = databaseController.getQueriesCount()
            statusObject.totalBlacklistedCPFs = result
            return callback(null, statusObject)
        }
    })

}

module.exports = {
    getStatus
}