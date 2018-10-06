const cpfController = require('../controllers').cpfController

module.exports = function (app) {

    app.get('/cpf/:cpfNumber/estado', (req, res) => {
        cpfController.getCPFStatus(req.params.cpfNumber, (responseObject) => {
            res.status(responseObject.status).send(responseObject.body)
        })
    })

    app.post('/cpf', (req, res) => {
        cpfController.saveCPF(req.body, (responseObject) => {
            res.status(responseObject.status).send(responseObject.body)
        })
    })


    app.delete('/cpf/:cpfNumber', (req, res) => {
        cpfController.deleteCPF(req.params.cpfNumber, (responseObject) => {
            res.status(responseObject.status).send(responseObject.body)
        })
    })

    app.patch('/cpf/estado', (req, res) => {
        cpfController.updateCPFStatus(req.body, (responseObject) => {
            res.status(responseObject.status).send(responseObject.body)
        })
    })
}
