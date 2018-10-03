const cpfController = require('../controllers').cpfController

module.exports = function (app) {

    app.post('/cpf', (req, res) => {
        //console.log(cpf)
        cpfController.saveCPF(req.body, (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.status(200).send(result)
        })
    })

    app.get('/cpf/:cpfNumber/estado', (req, res) => {
        cpfController.getCPFStatus(req.params.cpfNumber, (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.status(200).send(result)
        })
    })

    app.delete('/cpf/:cpfNumber', (req, res) => {
        cpfController.deleteCPF(req.params.cpfNumber, (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.status(200).send({numeroApagados:result})
        })
    })

    app.patch('/cpf/estado', (req, res) => {
        cpfController.updateCPFStatus(req.body, (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.status(200).send({numeroReemplazados:result})
        })
    })
}
