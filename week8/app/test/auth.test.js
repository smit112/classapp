process= 'test';

import request from 'supertest-as-promised';

import app from 'C:/Users/smits/Web Development/week 6/app/config/auth.config.js';
import app from 'C:/Users/smits/Web Development/week 6/app/config/db.config.js';
import { sync, create } from 'C:/Users/smits/Web Development/week 6/app/models/tutorial.model.js';

describe('auth', () => {

	let { token, refresh_token } = '';

	before(async () => {
		await sync({ force: true });
		await create({
			username: 'elf',
			password: '1234',
		});
	});

	describe('POST /tutorial.routes.js', () => {
		it('It should auth the user elf', (done) => {
			request(app)
				.post('/auth')
				.send({
					username: 'elf',
					password: '1234',
				})
				.expect(201)
				.then((res) => {
					token = res.body.token;
					refresh_token = res.body.refresh_token;
					done();
				});
		});
	});

	describe('POST /auth/refresh', () => {
		it('It should refresh the user elf\'s token', (done) => {
			request(app)
				.post('/auth/refresh')
				.send({
					username: 'elf',
					'refresh_token': refresh_token,
				})
				.expect(201)
				.then((res) => {
					token = res.body.token;
					done();
				});
		});
	});

});