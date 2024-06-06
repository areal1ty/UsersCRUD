const request = require('supertest');
const express = require('express');
const UserController = require('../controller/userController');
const InMemoryUserService = require('../service/inMemoryUserService');
const DbUserService = require('../service/dbUserService');

const { v4: uuidv4 } = require('uuid');

function generateUniqueEmail() {
    const uniqueId = uuidv4();
    return `user_${uniqueId}@example.com`;
}

function createAppWithService(userService) {
    const app = express();
    app.use(express.json());
    const userController = new UserController(userService);

    app.post('/', (req, res) => userController.create(req, res));
    app.get('/', (req, res) => userController.getAll(req, res));
    app.get('/:id', (req, res) => userController.getById(req, res));
    app.put('/:id', (req, res) => userController.update(req, res));
    app.delete('/:id', (req, res) => userController.delete(req, res));

    return app;
}

describe.each([
    ['InMemoryUserService', new InMemoryUserService()],
    ['DbUserService', new DbUserService()]
])('UserController with %s', (serviceName, userService) => {

    let app;
    const user1 = { name: 'John Doe', email: generateUniqueEmail() };

    beforeEach(async () => {
        app = createAppWithService(userService);
        await userService.clear;
        await userService.create(user1);
    });

    describe('POST /', () => {
        it('should create a new user and return it', async () => {
            const response = await request(app)
                .post('/')
                .send(user1)
                .expect(201);

            expect(response.body).toMatchObject(user1);

            const savedUser = await userService.getById(response.body.id);
            expect(savedUser).toMatchObject(user1);
        });
    });

    describe('GET /', () => {
        it('should return all users', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            const result = await userService.getAll();
            expect(response.body).toEqual(result);
        });
    });

    describe('GET /:id', () => {
        it('should return the user with the given id', async () => {
            const response = await request(app).get(`/${user1.id}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(user);
        });

        it('should return 404 if user not found', async () => {
            const response = await request(app).get('/nonexistid');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /:id', () => {
        it('should update the user with the given id', async () => {
            const updatedData = { name: 'Doe John', email: generateUniqueEmail() };
            const response = await request(app).put(`/${user1.id}`).send(updatedData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ ...user1, ...updatedData });
        });

        it('should return 404 if user not found', async () => {
            const updatedData = { name: 'Doe Doe', email: generateUniqueEmail() };
            const response = await request(app).put('/nonexistid').send(updatedData);
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /:id', () => {
        it('should delete the user with the given id', async () => {
            const response = await request(app).delete(`/${user1.id}`);
            expect(response.status).toBe(204);
        });

        it('should return 404 if user does not exist', async () => {
            const response = await request(app).delete('/nonexistid');
            expect(response.status).toBe(404);
        });
    });
});
