const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const User = require('../models/User');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  let token;

  before(async () => {
    // Créer un utilisateur et obtenir le token pour les tests
    await User.deleteMany({});
    const res = await chai.request(app)
      .post('/api/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });

    const loginRes = await chai.request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password' });

    token = loginRes.body.token;
  });

  describe('Catway API', () => {
    before(async () => {
      await Catway.deleteMany({});
    });

    it('should create a new catway', async () => {
      const res = await chai.request(app)
        .post('/api/catways')
        .set('Authorization', `Bearer ${token}`)
        .send({ catwayNumber: 1, type: 'long', catwayState: 'active' });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('catwayNumber', 1);
    });

    it('should get all catways', async () => {
      const res = await chai.request(app)
        .get('/api/catways')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should get a catway by ID', async () => {
      const catway = await Catway.findOne({});
      const res = await chai.request(app)
        .get(`/api/catways/${catway._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('catwayNumber', 1);
    });

    it('should update a catway by ID', async () => {
      const catway = await Catway.findOne({});
      const res = await chai.request(app)
        .put(`/api/catways/${catway._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ catwayState: 'inactive' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('catwayState', 'inactive');
    });

    it('should delete a catway by ID', async () => {
      const catway = await Catway.findOne({});
      const res = await chai.request(app)
        .delete(`/api/catways/${catway._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Catway deleted');
    });
  });

  describe('Reservation API', () => {
    before(async () => {
      await Reservation.deleteMany({});
    });

    it('should create a new reservation', async () => {
      const res = await chai.request(app)
        .post('/api/reservations')
        .set('Authorization', `Bearer ${token}`)
        .send({ catwayNumber: 1, clientName: 'John Doe', boatName: 'Sea Breeze', checkIn: '2023-06-01T00:00:00Z', checkOut: '2023-06-10T00:00:00Z' });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('clientName', 'John Doe');
    });

    it('should get all reservations', async () => {
      const res = await chai.request(app)
        .get('/api/reservations')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should get a reservation by ID', async () => {
      const reservation = await Reservation.findOne({});
      const res = await chai.request(app)
        .get(`/api/reservations/${reservation._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('clientName', 'John Doe');
    });

    it('should delete a reservation by ID', async () => {
      const reservation = await Reservation.findOne({});
      const res = await chai.request(app)
        .delete(`/api/reservations/${reservation._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(204);
    });
  });

  describe('User API', () => {
    it('should get user profile', async () => {
      const res = await chai.request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('email', 'test@example.com');
    });

    it('should update a user by ID', async () => {
      const user = await User.findOne({});
      const res = await chai.request(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated User' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'Updated User');
    });

    it('should delete a user by ID', async () => {
      const user = await User.findOne({});
      const res = await chai.request(app)
        .delete(`/api/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'User deleted successfully');
    });

    it('should get all users', async () => {
      const res = await chai.request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
});