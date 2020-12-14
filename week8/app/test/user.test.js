process = 'test';

import request from 'supertest-as-promised';
import { assert } from 'chai';
import { sign } from 'jsonwebtoken';

import { jwt as _jwt } from '../config';
import app from '../config/express';
import { sync, create } from '../api/models/User';

describe('users', () => {

	let token = '';

	before(async () => {
		await sync({ force: true });
		await create({
			username: 'Darth Vader',
			password: '1234',
		});
		await create({
			username: 'elf',
			password: '1234',
		});
		token = sign({ id: 1 }, _jwt.jwtSecret, { expiresIn: _jwt.jwtDuration });
	});

	describe('GET /users', () => {
		it('It should GET all the users', (done) => {
			request(app)
				.get('/users')
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.then((res) => {
					assert.typeOf(res.body, 'array');
					assert.equal(res.body.length, 2);
					done();
				});
		});
	});

	describe('POST /users', () => {
		it('It should create a new user', (done) => {
			request(app)
				.post('/users')
				.send({
					username: 'Homer J. Simpson',
					password: '1234',
				})
				.expect(201)
				.then((res) => {
					assert.equal(res.body.username, 'Homer J. Simpson');
					done();
				});
		})
	});

	describe('GET /users/:username', () => {
		it('It should retrieve the user with id 1', (done) => {
			request(app)
				.get('/users/3')
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.then((res) => {
					assert.equal(res.body.username, 'Homer J. Simpson');
					done();
				});
		});
	});

	describe('PUT /users/:username', () => {
		it('It should update user "Darth Vader" to "Obi Wan"', (done) => {
			request(app)
				.put('/users/2')
				.set('Authorization', `Bearer ${token}`)
				.send({
					username: 'Homer J. Simpson',
				})
				.expect(201, done());
		});
	});

	describe('DELETE /users/:username', () => {
		it('It should delete user with id 3', (done) => {
			request(app)
				.delete('/users/3')
				.set('Authorization', `Bearer ${token}`)
				.expect(204, done());
		});
	});

});