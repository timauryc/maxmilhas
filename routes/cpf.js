const cpfController = require('../controllers').cpfController

module.exports = function (app) {

    app.get('/cpf/:cpfNumber/estado', (req, res) => {
        cpfController.getCPFStatus(req.params.cpfNumber, (responseObject) => {
            console.log(JSON.stringify(responseObject))
            res.status(responseObject.status).send(responseObject.body)
        })
    })

    app.post('/cpf', (req, res) => {
        cpfController.saveCPF(req.body, (responseObject) => {
            console.log(JSON.stringify(responseObject))
            res.status(responseObject.status).send(responseObject.body)
        })
    })


    app.delete('/cpf/:cpfNumber', (req, res) => {
        cpfController.deleteCPF(req.params.cpfNumber, (responseObject) => {
            console.log(JSON.stringify(responseObject))
            res.status(responseObject.status).send(responseObject.body)
        })
    })

    app.patch('/cpf/estado', (req, res) => {
        console.log('recebi um patch')
        cpfController.updateCPFStatus(req.body, (responseObject) => {
            console.log(JSON.stringify(responseObject))
            res.status(responseObject.status).send(responseObject.body)
        })
    })
}
