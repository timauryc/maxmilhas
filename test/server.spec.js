const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');

const server = require('../server')
const stop = require('../server')
const databaseController = require('../controllers/database')

chai.use(chaiHttp);

describe('Server', function () {
    dummyCPFObject = {
        _id: "111.111.111-11",
        status: "FREE"
    }
    
    beforeEach(function (done) {
        databaseController.saveCPF(dummyCPFObject, function (err, newObject) {
            if (err)
                throw new Error('Saving dummy documment on database went wrong')
            done()
        })
    });
    afterEach(function (done) {
        databaseController.deleteCPF("111.111.111-11", function (err, numRemoved) {
            if (err)
                throw new Error('Deleting dummy documment on database went wrong')
            done()
        })
    });
 
    describe('Get a cpf (GET /cpf/<cpf number>/estado)', function () {
        it('should return the correct object if cpf registered', function (done) {
            chai.request(server)
                .get('/cpf/111.111.111-11/estado')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id')
                    res.body.should.have.property('status')
                    res.body._id.should.equal('111.111.111-11')
                    res.body.status.should.equal('FREE')
                    done();
                })
        })

        it('should return no object in case the cpf is not registered', function (done) {
            chai.request(server)
                .get('/cpf/222.222.222-22/estado')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.not.be.json;
                    done();
                })
        })

        it('Should not allow to query for a cpf in a wrong format', function (done) {
            chai.request(server)
                .get('/cpf/aa1.b2-c/estado')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })
    });

    describe('Insert a cpf (POST /cpf)', function () {
        it('should return the object inserted with the correct status', function (done) {
            chai.request(server)
                .post('/cpf')
                .send({ '_id': '222.222.222-22', 'status': 'FREE' })
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id')
                    res.body.should.have.property('status')
                    res.body._id.should.equal('222.222.222-22')
                    res.body.status.should.equal('FREE')
                    done();
                })
        })

        it('should not allow duplicate cpfs', function (done) {
            chai.request(server)
                .post('/cpf')
                .send({ '_id': '111.111.111-11', 'status': 'FREE' })
                .end(function (err, res) {
                    res.should.have.status(409);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('key')
                    res.body.should.have.property('errorType')
                    res.body.key.should.equal('111.111.111-11')
                    res.body.errorType.should.equal('uniqueViolated')
                    done();
                })
        })

        it('Should not allow to insert a cpf in a wrong format', function (done) {
            chai.request(server)
                .post('/cpf')
                .send({ '_id': 'aa1.b2-c', 'status': 'FREE' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })

        it('Should not allow to insert a cpf with wrong status', function (done) {
            chai.request(server)
                .post('/cpf')
                .send({ '_id': '444.444.444-44', 'status': 'HELL YEAH' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })
    })

    describe('Delete a cpf (Delete /cpf/<cpf number>)', function () {
        it('should delete the cpf succesfully', function (done) {
            chai.request(server)
                .delete('/cpf/111.111.111-11')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalDeleted')
                    res.body.totalDeleted.should.equal(1)
                    done();
                })
        })

        it('should delete nothing if the cpf number was not found', function (done) {
            chai.request(server)
                .delete('/cpf/333.333.333-33')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalDeleted')
                    res.body.totalDeleted.should.equal(0)
                    done();
                })
        })

        it('Should not allow to delete a cpf in a wrong format', function (done) {
            chai.request(server)
                .delete('/cpf/aa1.b2-c/')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })
    })

    describe('Modify a cpf (Patch /cpf)', function () {
        it('should modify the cpf object', function (done) {
            chai.request(server)
                .patch('/cpf/estado')
                .send({ '_id': '111.111.111-11', 'status': 'BLOCK' })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalReplaced')
                    res.body.totalReplaced.should.equal(1)
                    done();
                })
        })

        it('should modify nothing if the cpf number was not found', function (done) {
            chai.request(server)
                .patch('/cpf/estado')
                .send({ '_id': '333.333.333-33', 'status': 'BLOCK' })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalReplaced')
                    res.body.totalReplaced.should.equal(0)
                    done();
                })
        })

        it('Should not allow to insert a cpf in a wrong format', function (done) {
            chai.request(server)
                .patch('/cpf/estado')
                .send({ '_id': 'aa1.b2-c', 'status': 'FREE' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })

        it('Should not allow to insert a cpf with wrong status', function (done) {
            chai.request(server)
                .patch('/cpf/estado')
                .send({ '_id': '444.444.444-44', 'status': 'HELL YEAH' })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.have.property('error')
                    done();
                })
        })
    })
})