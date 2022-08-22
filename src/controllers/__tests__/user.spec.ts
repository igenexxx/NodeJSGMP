import supertest from 'supertest';

import 'reflect-metadata';
import { app } from '../../app.js';

describe('some value', () => {
  it('should ', () => {
    supertest(app).post('/api/users').send({}).expect(200);
  });
});
