const statusController = require('../controllers').statusController

module.exports = function (app) {
    app.get('/status', (req, res) => {
        statusController.getStatus((err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(result)
            }
        })
    })

}