import request from 'supertest';
import app from '../app.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Event.deleteMany();
  await User.deleteMany();
});

describe('Events', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Organizer', email: 'org@example.com', password: 'password', role: 'organizer' });
    token = res.body.token;
    const user = await User.findOne({ email: 'org@example.com' });
    userId = user._id;
  });

  it('should get events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('events');
  });

  it('should create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Event',
        description: 'Description',
        category: 'Test',
        location: 'Location',
        startDate: '2024-12-01',
        endDate: '2024-12-02',
        capacity: 10,
        price: 0
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Event');
  });
});