const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Assurez-vous que le chemin est correct
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });
  });

  describe('Catway API', () => {
    let token;
    let catwayId;

    before((done) => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password'
        })
        .end((err, res) => {
          chai.request(server)
            .post('/api/users/login')
            .send({
              email: 'testuser@example.com',
              password: 'password'
            })
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        });
    });

    it('should create a new catway', (done) => {
      chai.request(server)
        .post('/api/catways')
        .set('Authorization', `Bearer ${token}`)
        .send({
          catwayNumber: 1,
          type: 'long',
          catwayState: 'available'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('catwayNumber').eql(1);
          catwayId = res.body._id;
          done();
        });
    });

    it('should get all catways', (done) => {
      chai.request(server)
        .get('/api/catways')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should get a catway by ID', (done) => {
      chai.request(server)
        .get(`/api/catways/${catwayId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('catwayNumber').eql(1);
          done();
        });
    });

    it('should update a catway', (done) => {
      chai.request(server)
        .put(`/api/catways/${catwayId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          catwayState: 'occupied'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('catwayState').eql('occupied');
          done();
        });
    });

    it('should delete a catway', (done) => {
      chai.request(server)
        .delete(`/api/catways/${catwayId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });


  after((done) => {
    mongoose.connection.close();
    done();
  });
});