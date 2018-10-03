const cpfController = require('../controllers').cpfController

module.exports = function (app) {

    app.get('/status', (req, res) => {
        cpfController.getCPFStatus(req.params.cpfNumber, (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.status(200).send(result)
        })
    })

}